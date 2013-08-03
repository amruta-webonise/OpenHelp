<?php
/**
 * @file
 * Returns the HTML for the basic html structure of a single Drupal page.
 *
 * Complete documentation for this file is available online.
 * @see http://drupal.org/node/1728208
 */
?><!DOCTYPE html>
<!--[if IEMobile 7]>
<html class="iem7" <?php print $html_attributes; ?>><![endif]-->
<!--[if lte IE 6]>
<html class="lt-ie9 lt-ie8 lt-ie7" <?php print $html_attributes; ?>><![endif]-->
<!--[if (IE 7)&(!IEMobile)]>
<html class="lt-ie9 lt-ie8" <?php print $html_attributes; ?>><![endif]-->
<!--[if IE 8]>
<html class="lt-ie9" <?php print $html_attributes; ?>><![endif]-->
<!--[if (gte IE 9)|(gt IEMobile 7)]><!-->
<html <?php print $html_attributes . $rdf_namespaces; ?>><!--<![endif]-->
<!--[if IE 9]>
<html class="ie9"><![endif]-->
<head>
    <?php print $head; ?>
    <title><?php print $head_title; ?></title>


    <?php if(request_path() !="enable-javascript"){ ?>
    <noscript><meta http-equiv="refresh" content="0; url=/enable-javascript"></noscript>
    <?php } ?>

    <?php if ($default_mobile_metatags): ?>
    <meta name="MobileOptimized" content="width">
    <meta name="HandheldFriendly" content="true">
    <meta name="viewport" content="width=device-width">
    <?php endif; ?>
<!--    <meta http-equiv="cleartype" content="on">-->

    <?php print $styles; ?>
    <?php print $scripts; ?>
    <?php if ($add_respond_js): ?>
    <!--[if lt IE 9]>
    <script src="<?php print $base_path . $path_to_zen; ?>/js/html5-respond.js"></script>
    <![endif]-->
    <?php elseif ($add_html5_shim): ?>
    <!--[if lt IE 9]>
    <script src="<?php print $base_path . $path_to_zen; ?>/js/html5.js"></script>
    <![endif]-->
    <?php endif; ?>

</head>
<body class="<?php print $classes; ?>">
<?php if ($skip_link_text && $skip_link_anchor): ?>
    <?php endif; ?>
<?php print $page_top; ?>
<?php print $page; ?>
<?php print $page_bottom; ?>
<?php
$explode = explode("/", $_SERVER['REQUEST_URI']);
if ($explode[2] == 'photo-gallery' || $explode[1] == 'procurement') {
    ?>
<script type='text/javascript'>
    $('.region-sidebar-first a.menu--link').each(function () {
        var href_photos = $(this).attr('href');
        if (href_photos == '/news/photo-gallery' || href_photos == '/procurement-opportunities') {
            $(this).attr('class', 'active');
        }
    });
</script>
    <?php
}
if (arg(0) == "video") {
    drupal_add_js($path . 'js/jquery.colorbox-min.js', array('type' => 'external'));
    ?>
<script type="text/javascript" src="/sites/all/themes/zen/zen-internals/js/jwplayer.js"></script>
<script type="text/javascript" src="/sites/all/themes/zen/zen-internals/js/jwplayer.html5.js"></script>
<div>

    <script type='text/javascript'>
        $(document).ready(function () {

            $('.videoGalList a.media').click(function () {
                $(this).colorbox({
                    html:"<div id='my-video'></div>",
                    width:"660",
                    height:"425",
                    //inline:true,
                    onComplete:function () {
                        playVideo($(this).prev().attr('href'));
                    },
                    onClosed:function () {
                        jwplayer().stop();
                    }
                });
            });

            $('.videoGalList a.inline').click(function () {

                $(this).colorbox({
                    html:"<div id='my-video'></div>",
                    width:"660",
                    height:"425",
                    //inline:true,
                    onComplete:function () {
                        playVideo($(this).prev().find('source').attr('src'));
                    },
                    onClosed:function () {
                        jwplayer().stop();
                    }
                });
            });

            function playVideo(videoUrl){
                jwplayer("my-video").setup({
                    file:videoUrl,
                    analytics:{
                        enabled:false,
                        cookies:false
                    },
                    autostart: true
                });
            }

        });
    </script>
</div>
    <?php
}

?>
</body>
</html>
