<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Vijay
 * Date: 01/02/13
 * Time: 4:07 PM
 * To change this template use File | Settings | File Templates.
 */
class SaveTripDAO {
    #check duplication before saving
    public function checkTripExists($uid, $from_location_slug, $to_location_slug,$tripId='',$title) {
        $countTitle = 0;
        $getFavoriteSql = 'SELECT id FROM favorite_trips AS ft
                        WHERE ft.uid = :uid AND ft.from_location_slug = :from_location
                        AND ft.to_location_slug = :to_location';

        $bindVars = array(':uid' => $uid, ':from_location' => $from_location_slug, ':to_location' => $to_location_slug);

        $result = db_query($getFavoriteSql, $bindVars);

        $dataMatchCount = $result->rowCount();

        // Check if title is matching to other trip
        if($dataMatchCount == 0){
            $checkTitleSql = 'SELECT id FROM favorite_trips AS ft
                        WHERE ft.uid = :uid AND ft.title = :title';
            $bindVars = array(':uid' => $uid, ':title' => $title);

            $checkResult = db_query($checkTitleSql, $bindVars);
            $dataMatchCount = $checkResult->rowCount();

        }

        return $dataMatchCount;
    }

    public function saveTrip($data) {

        //extract($data);

        $fields = array(
            'uid' => $data['uid'],
            'title' => $data['title'],
            'mode_of_transit' => $data['mode_of_transit'],
            'from_location' => $data['from_location'],
            'to_location' => $data['to_location'],
            'from_location_slug' => $this->createSlug($data['from_location'], '_'),
            'to_location_slug' => $this->createSlug($data['to_location'], '_'),
            'schedule_type' => $data['schedule_type'],
            'date_of_travel' => date('Y-m-d',strtotime($data['date_of_travel'])),
            'depart_hour' => $data['depart_hr'],
            'time_format' => $data['time_format']
        );


        if (db_insert('favorite_trips')->fields($fields)->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function createSlug($string, $separator) {

        $string = strtolower($string);
        $string = preg_replace('/[^a-z0-9_]/i', $separator, $string);
        $string = preg_replace('/' . preg_quote($separator) . '[' . preg_quote($separator) . ']*/', $separator, $string);

        $string = preg_replace('/' . preg_quote($separator) . '$/', '', $string);
        $string = preg_replace('/^' . preg_quote($separator) . '/', '', $string);

        return $string;
    }



    public function updateTrip($data) {

        //extract($data);

        $fields = array(
            'uid' => $data['uid'],
            'title' => $data['title'],
            'mode_of_transit' => $data['mode_of_transit'],
            'from_location' => $data['from_location'],
            'to_location' => $data['to_location'],
            'from_location_slug' => $this->createSlug($data['from_location'], '_'),
            'to_location_slug' => $this->createSlug($data['to_location'], '_'),
            'schedule_type' => $data['schedule_type'],
            'date_of_travel' => date('Y-m-d',strtotime($data['date_of_travel'])),
            'depart_hour' => $data['depart_hr'],
           // 'depart_minute' => $data['depart_min'],
            'time_format' => $data['time_format']
        );

        if (db_update('favorite_trips')
            ->fields($fields)
            ->condition('id', $data['id'])
            ->execute()) {
            return true;
        } else {
            return false;
        }
    }
}

