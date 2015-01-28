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
     * Usage:
     * Field that contains the final calculated name: "class": "smw_autotitle smw_url_?strasse?plz?ort?land?adressZusatz",
     * Source Fields: "class": "smw_autotitle_source attr_plz"
     */
    mw.libs.autoFillFormFields.initInstance = function(element) {

        var $el = $(element);
        var autoTitleElement = $el.find('.smw_autotitle');

        // If MultipleInstances has a smw_autotitle field:
        if (autoTitleElement.length === 1) {

            var title = $('link[rel="ExportRDF"]').attr('title');
            var classes = autoTitleElement.attr('class').split(' ');
            var path = false;

            // Set as readonly field, so it can be submitted but not manipulated by the user
            autoTitleElement.prop('readonly', true);

            // Calculate Naming Path
            for (var j = 0; j < classes.length; j++) {

                var className = classes[j];

                if (className.indexOf("smw_url_") > -1) {
                   path = className.replace('smw_url_', '');
                   path = path.replace('CURRENT', title);
                   path = path.replace('__', '/');
                }

            }

            // If path could be found / set
            if (path) {

                var variables = path.split('?');

                var sources = $el.find('.smw_autotitle_source');
                var variablesMap = {};

                for (var k = 1; k < variables.length; k++) {

                    var varName = variables[k];
                    var $elName = $el.find('.attr_' + varName);

                    variablesMap[varName] = $elName;

                }

                // Initial calculation of the automatic field value
                mw.libs.autoFillFormFields.updateInstance($el, autoTitleElement, variables, variablesMap);

                // Listen on KeyUp Event on every field that is a source
                sources.on("keyup", function() {
                    mw.libs.autoFillFormFields.updateInstance($el, autoTitleElement, variables, variablesMap);
                });

                // Listen on KeyUp Event on every field that is a source
                sources.on("change", function() {
                    mw.libs.autoFillFormFields.updateInstance($el, autoTitleElement, variables, variablesMap);
                });
            }

        }

    };

    /**
     * Updates the title on init and keypress
     * Uses a hard coded separator
     */
    mw.libs.autoFillFormFields.updateInstance = function($el, autoTitleElement, variables, variablesMap) {

        var separator = ', ';
        var calculatedTitle = variables[0];

        for (var i = 0; i < variables.length; i++) {

            var varName = variables[i];

            if (variablesMap[varName]) {
                var value = variablesMap[varName].val();

                if (value && value !== '') {
                    value = value.trim();
                    calculatedTitle += variablesMap[varName].val();
                    calculatedTitle +=  separator;
                }
            }
        }

        calculatedTitle = calculatedTitle.slice(0, -separator.length);
        autoTitleElement.val(calculatedTitle);
    };

    // Register JavaScript Hook on DOM ready
    jQuery(document).ready(function() {

        try {

            // Only execute if a SemanticForm is existent
            if ($('#sfForm').length > 0) {

                // Registers all current instances
                $('.multipleTemplateInstance, .formtable ').each(function() {
                    mw.libs.autoFillFormFields.initInstance($(this));
                });

                // Registers future instances
                // Uses sf.addTemplateInstance Hook that is triggered everytime a new form instance is added
                mw.hook('sf.addTemplateInstance').add(function($instance) {
                    mw.libs.autoFillFormFields.initInstance($instance);
                });
            }


        } catch (e) {
            console.error('AutoFillFormField crashed!');
            console.error(e);
        }

    });

}(mediaWiki, jQuery));