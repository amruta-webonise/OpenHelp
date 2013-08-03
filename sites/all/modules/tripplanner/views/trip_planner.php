<?php
$departRadio = '';
$arriveRadio = '';
if ($userData['schedule_type'] == 1) {
    $arriveSelected = '';
    $departSelected = 'selected';
} else {
    $departSelected = '';
    $arriveSelected = 'selected';
}

//$date = (!empty($userData['date_of_travel'])) ? date('m/d/Y', strtotime($userData['date_of_travel'])) : date('m/d/Y');

$amSelected = '';
$pmSelected = '';
if ($userData['time_format'] == 'pm') {
    $pmSelected = 'selected';
} else if ($userData['time_format'] == 'am') {
    $amSelected = 'selected';
}

?>

<div class="tripPlanCnt clearfix">
    <div class="tripPlanCntLft">
        <div class="dirHeading">
            <h2>Transit Directions</h2>
            <a href="/maps-and-schedules">View bus routes &raquo; </a>
        </div>
        <form accept-charset="utf-8" id="tripPlannerForm" method="post">
            <input id="uid" name="uid" type="hidden" value="<?php echo $userData['uid'];?>"/>
            <input id="trip_id" name="id" type="hidden" value="<?php echo $userData['id'];?>"/>
            <input type="hidden" id="selectedHr" value="<?php echo $userData['depart_hour']; ?>">
            <input type="hidden" id="isDST" value="<?php echo date('I', time()); ?>">
            <!--isDST === The I (capital i) is a 1/0 denoting whether or not daylight saving is currently in effect.-->

            <div class="travelCnt">
                <h4>Travel by:</h4>

                <div class="travelOpt transitMode">
                    <a class="active" href="javascript:void(0);" id="transitOpt"
                       onclick="changeMode('TRANSIT',this.id);">Transit</a>
                    <a href="javascript:void(0);" id="walkingOpt" onclick="changeMode('WALKING',this.id);">Walking</a>
                    <a href="javascript:void(0);" id="bicyclingOpt"
                       onclick="changeMode('BICYCLING',this.id);">Bicycling</a>
                    <input type="hidden" id="modeOfTransportation" name="mode_of_transit" value="TRANSIT">
                </div>
                <div class="tabsCntWrap">
                    <div id="transit" class="tabsCnt transitCnt">
                        <div class="dirFormCnt">
                            <span class="mapIcon"></span>
                            <input type="text" id="from" name="from_location"
                                   value="<?php echo $userData['from_location'];?>" placeholder="From"/><br/>
                            <span class="mapIcon"></span>
                            <input type="text" id="to" name="to_location" value="<?php echo $userData['to_location'];?>"
                                   placeholder="To"/>
                            <span class="reverceIcon" id="reset" onclick="reverseDirection()"></span>
                        </div>

                        <div class="formCnt" id="transitWrapper">
                            <select class="departList" name="schedule_type" id="scheduleType">
                                <option value="1" <?php echo $departSelected;?>>Depart</option>
                                <option value="2" <?php echo $arriveSelected;?>>Arrive</option>
                            </select>

                            <div class="dateCnt">
                                <input type="text" id="travelDate" name="date_of_travel" readonly="readonly"
                                       value="<?php echo $userData['date_of_travel'];?>" placeholder="Date"/>
                                <input type="hidden" id="requiredDateFormat"  value="<?php echo $userData['required_date_format'];?>"/>
                            </div>
                            <select class="hoursList" id="departHr" name="depart_hr">
                                <!--<option>Time</option>-->
                            </select>


                            <select class="amPmList" id="timeFormat" name="time_format">
                                <option value="pm" <?php echo $pmSelected;?> selected="selected">pm</option>
                                <option value="am" <?php echo $amSelected;?>>am</option>
                            </select>
                        </div>
                        <div class="dirBtnCnt">
                            <img id="tripLoader" src="/sites/all/modules/tta/images/loaderSmall.gif" style="display: none" />
                            <a class="greenBtn" id="go" href="">Get Directions</a>
                            <a class="blueBtn" href="#inline1" id="favoriteTrip">+Add to my trips</a>
                            <span class="infoIcon" title="Entering Your Origin & Destination.<br /> Selecting Your Arrival or Departure Date & Time
,<br /> stop number, or zip code. "></span>
                        </div>
                    </div>

                </div>
            </div>
            <div class="tripPlanLightBox" style="display: none;" id="inline1">
                <div class="stopNameWrap">
                    <div class="stopName">
                        <h2>Add to My Trips</h2>

                        <p>Enter the name of trip and click on SAVE button.</p>
                    </div>
                </div>
                <div class="addMyTripsCnt">
                    <p>
                        <span>Name this trip:</span>
                        <input type="text" name="title" id="favorite" placeholder="Your trip name..." value="<?php echo $userData['title'];?>"/>
                    </p>

                    <div class="addMyTripsBtm">
                        <img id="loader" src="/sites/all/modules/tta/images/loaderSmall.gif" style="display: none;"/>
                        <a id="saveTrip" href="javascript:void(0)" class="greenBtn">Save</a>
                        <?php if(!empty($userData['uid'])):?>
                        <a id="viewMyTrip" href="/favorite/trips"  >View My Trips &raquo;</a>
                            <?php else:?>
                        <a id="viewMyTrip" href="javascript:confirmRedirect()"  >View My Trips &raquo;</a>
                        <?php endif?>
                    </div>
                </div>
            </div>
            <!-- End:tripPlanLightBox end -->

        </form>
        <div id="errorMessage"></div>
        <div id="panel"></div>
    </div>
    <div class="tripPlanCntRht">
        <div id="map"></div>
    </div>
</div>

