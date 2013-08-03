<?php drupal_set_title('Login'); ?>
<h2><span>My</span> Ride Login</h2>
<p>Enter your Email address and password below to login into your account.</p>
<?php
print render($form['name']);
print render($form['pass']);
print render($form['form_build_id']);
print render($form['form_id']);
print render($form['links']);
?>
