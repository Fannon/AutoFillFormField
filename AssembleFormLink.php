<?php
/**
 * Automatically fill FormFields based on the (live) input of other fields
 *
 * For more info see http://mediawiki.org/wiki/Extension:AssembleFormLink
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
   'name'           => 'AutoFillFormFields',
   'author'         => array('Simon Heimler'),
   'version'        => '0.0.1',
   'url'            => 'https://www.mediawiki.org/wiki/Extension:AssembleFormLink',
   'descriptionmsg' => 'AssembleFormLink-desc',
);


//////////////////////////////////////////
// RESOURCE LOADER                      //
//////////////////////////////////////////

$wgResourceModules['ext.AutoFillFormFields'] = array(
   'scripts' => array(
      'lib/AutoFillFormFields.js',
   ),
   'styles' => array(

   )
   ,'messages' => array(
   ),
   'dependencies' => array(
   ),
   'localBasePath' => __DIR__,
   'remoteExtPath' => 'AutoFillFormFields',
);


