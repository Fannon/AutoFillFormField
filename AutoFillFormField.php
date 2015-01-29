<?php
/**
 * Automatically fill a SemanticForms input field based on the (live) input of other fields
 *
 * For more info see http://mediawiki.org/wiki/Extension:AutoFillFormField
 *
 * @file
 * @ingroup Extensions
 * @package MediaWiki
 *
 * @links https://github.com/Fannon/AutoFillFormField/blob/master/README.md Documentation
 * @links https://www.mediawiki.org/wiki/Extension_talk:AutoFillFormField Support
 * @links https://github.com/Fannon/AutoFillFormField/issues Bug tracker
 * @links https://github.com/Fannon/AutoFillFormField Source code
 *
 * @author Simon Heimler (Fannon), 2015
 * @license http://opensource.org/licenses/mit-license.php The MIT License (MIT)
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
   'author'         => array( 'Simon Heimler' ),
   'version'        => '0.1.0',
   'url'            => 'https://www.mediawiki.org/wiki/Extension:AutoFillFormField',
   'descriptionmsg' => 'autofillformfield-desc',
   'license-name'   => 'MIT'
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

// Register extension messages
$wgMessagesDirs['AutoFillFormField'] = __DIR__ . '/i18n';
$wgExtensionMessagesFiles['AutoFillFormField'] = __DIR__ . '/AutoFillFormField.i18n.php';


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
