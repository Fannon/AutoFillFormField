<?php
/**
 * Automatically fill FormField based on the (live) input of other fields
 *
 * For more info see http://mediawiki.org/wiki/Extension:AutoFillFormField
 *
 * @file
 * @ingroup Extensions
 * @author Simon Heimler, 2014
 * @license GNU General Public Licence 2.0 or later
 */

//////////////////////////////////////////
// VARIABLES                            //
//////////////////////////////////////////



//////////////////////////////////////////
// CREDITS                              //
//////////////////////////////////////////

$wgExtensionCredits['other'][] = array(
   'path'           => __FILE__,
   'name'           => 'AutoFillFormField',
   'author'         => array('Simon Heimler'),
   'version'        => '0.0.1',
   'url'            => 'https://www.mediawiki.org/wiki/Extension:AutoFillFormField',
   'descriptionmsg' => 'AutoFillFormField-desc',
);


//////////////////////////////////////////
// RESOURCE LOADER                      //
//////////////////////////////////////////

$wgResourceModules['ext.AutoFillFormField'] = array(
   'scripts' => array(
      'lib/AutoFillFormField.js',
   ),
   'styles' => array(

   )
   ,'messages' => array(
   ),
   'dependencies' => array(
   ),
   'localBasePath' => __DIR__,
   'remoteExtPath' => 'AutoFillFormField',
);


