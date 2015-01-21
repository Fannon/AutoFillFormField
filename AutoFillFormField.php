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

$dir         = dirname( __FILE__ );
$dirbasename = basename( $dir );


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
   'dependencies' => array(
      'ext.semanticforms.main',
   ),
   'localBasePath' => __DIR__,
   'remoteExtPath' => 'AutoFillFormField',
);



//////////////////////////////////////////
// LOAD FILES                           //
//////////////////////////////////////////

// Register hooks
$wgHooks['BeforePageDisplay'][] = 'autoFillFormFieldOnBeforePageDisplay';



//////////////////////////////////////////
// HOOK CALLBACKS                       //
//////////////////////////////////////////

/**
* Add plastic.js library to all pages
*/
function autoFillFormFieldOnBeforePageDisplay(OutputPage &$out, Skin &$skin) {

  // Add as ResourceLoader Module
  $out->addModules('ext.AutoFillFormField');

  return true;
}