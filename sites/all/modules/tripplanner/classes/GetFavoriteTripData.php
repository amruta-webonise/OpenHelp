<?php

/**
 * Fetch favorite trip records
 *
 * Fetching data form table and displaying it. The favorite trips are only for the logged in user
 *
 *
 * @package
 * Trip Planner
 * @copyright
 * Triangle Transit
 *
 * @createOn
 * 4 Feb 2013
 */


    class GetFavoriteTripData {

        /**
         * @Name
         * getUserFavoriteTrip
         * @Purpose
         * To fetch records from favorite trip table for logged in user on view details.
         * @Author
         * Anand (www.webonise.lab)
         * @CreatedOn
         * 31 Jan 2013
         **/

        function getUserFavoriteTrip($tripId){

            $query = "SELECT * FROM favorite_trips as favorite_trip where id =" . $tripId ;

            $result = db_query($query)->fetch();

            return (array)$result;
        }


    }



?>