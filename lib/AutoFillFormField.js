/**
 * AutoFillFormField Extension
 *
 * https://www.mediawiki.org/wiki/Extension:AutoFillFormField
 *
 * @author  Simon Heimler
 */
(function (mw, $) {

    'use strict';

    /** Namespace */
    mw.libs.autoFillFormFields = {};

    /**
     * Init an Semantic Forms Instance, containing smw_autotitle fields
     *
     * Usage:
     * Field that contains the final calculated name: "class": "smw_autotitle smw_url_?strasse?plz?ort?land?adressZusatz",
     * Source Fields: "class": "smw_autotitle_source attr_plz"
     */
    mw.libs.autoFillFormFields.initInstance = function($el) {


        var autoTitleElement = $el.find('.AutoFillFormFieldTarget');

        // If MultipleInstances has a AutoFillFormFieldTarget field:
        if (autoTitleElement.length === 1) {

            var title = $('link[rel="ExportRDF"]').attr('title');

            // If no title was found, the page has not been created yet
            // Get the wgPageName and remove the parts of the URL that are used for form editing
            if (!title) {
                title = mw.config.get('wgPageName');
                var titleArr = title.split('/');
                titleArr.shift();
                titleArr.shift();
                title = titleArr.join('/');
            }

            var classes = autoTitleElement.attr('class').split(' ');
            var path = false;
            var originalPath = false;

            // Set as readonly field, so it can be submitted but not manipulated by the user
            autoTitleElement.prop('readonly', true);

            // Calculate Naming Path
            for (var j = 0; j < classes.length; j++) {

                var className = classes[j];

                // Search for classname that begins with "URL:". I defines how to construct the final path
                if (className.substring(0, 4) === 'URL:') {
                    path = className.replace('URL:', '');
                    path = path.split('FULLPAGENAME').join(title);
                    path = path.split('___').join(' ');
                }

            }


            // If path could be found / set
            if (path) {

                autoTitleElement.attr('AutoFillFormFieldPath', path);

                // Extract which variables are used and convert them to an array.
                var variables = path.split('?');

                var sources = $el.find('.AutoFillFormFieldSource');
                var targetMap = {};

                // Only iterate over the odd elements of the array
                // This is because every variable is delimited by two ?.
                for (var k = 1; k < variables.length; k += 2) {

                    var varName = variables[k];
                    var $targetEl = $el.find('.source_' + variables[k]);

                    if ($targetEl.length > 0) {
                        targetMap[varName] = $targetEl;
                    } else {
                        targetMap[varName] = false;
                    }
                }

                // Initial calculation of the automatic field value
                mw.libs.autoFillFormFields.updateInstance(autoTitleElement, path, targetMap);

                // Listen on KeyUp Event on every field that is a source
                sources.on("keyup", function() {
                    mw.libs.autoFillFormFields.updateInstance(autoTitleElement, path, targetMap);
                });

                // Listen on KeyUp Event on every field that is a source
                sources.on("change", function() {
                    mw.libs.autoFillFormFields.updateInstance(autoTitleElement, path, targetMap);
                });
            }

        }

    };

    /**
     * Updates the title on init and keypress
     * Uses a hard coded separator
     */
    mw.libs.autoFillFormFields.updateInstance = function(autoTitleElement, path, targetMap) {

        try {

            var calculatedTitle = path;

            for (var varName in targetMap) {

                var targetEl = targetMap[varName];

                if (targetEl) {

                    // Replace the ?variable? with the actual value of the source field
                    var val = targetEl.val();
                    val = val.trim();
                    calculatedTitle = calculatedTitle.split('?' + varName + '?').join(val);
                }

            }

            // Trim title, since this is the default behaviour of SMW property values anyway
            autoTitleElement.val(calculatedTitle.trim());

        } catch (e) {
            console.error('AutoFillFormField crashed while updating!');
            console.error(e);
        }


    };


    // Register JavaScript Hook on DOM ready
    jQuery(document).ready(function() {

        try {

            // Only execute if a SemanticForm is existent
            if ($('#sfForm').length > 0) {

                // Registers all current instances
                $('.multipleTemplateInstance, .formtable').each(function() {
                    mw.libs.autoFillFormFields.initInstance($(this));
                });

                // Registers future instances
                // Uses sf.addTemplateInstance Hook that is triggered everytime a new form instance is added
                mw.hook('sf.addTemplateInstance').add(function($instance) {
                    mw.libs.autoFillFormFields.initInstance($instance);
                });
            }


        } catch (e) {
            console.error('AutoFillFormField crashed on init!');
            console.error(e);
        }

    });

}(mediaWiki, jQuery));