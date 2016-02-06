YUI.add('moodle-block_panopto-asyncload', function(Y) {

        M.block_panopto = M.block_panopto || {};

        M.block_panopto.asyncload = {
            init: function(params) {
                
                // Find the div containing the Panotpo block's content.
                var mynode = Y.one('#'+params.id);
                
                if (mynode) {
                    
                    //Execute on DOM load
                    Y.on('domready', function() {
                        var ioconfig = {
                            method: "POST",
                            sync: false,
                            timeout: 10000,
                            data : {'sesskey' : M.cfg.sesskey,
                                    'courseid' : params.courseid},
                            on: {
                                success: function(id, o, arguments) {
                                    try {
                                        //Remove loading text
                                        mynode.removeChild(Y.one('#loading_text'));
                                        //Add Panopto content to block display
                                        mynode.append(o.responseText);
                                    } catch (err) {
                                        Y.log(err.message);
                                    }
                                },
                                failure: function(id, o, arguments) {
                                    try {
                                        //Remove loading text
                                        mynode.removeChild(Y.one('#loading_text'));
                                        //Display error in block.
                                        mynode.append(o.responseText)
                                    } catch(err) {
                                        Y.log(err.message);
                                    }
                                }
                            }

                        };

                        Y.io(M.cfg.wwwroot + '/blocks/panopto/panopto_content.php', ioconfig);

                    }, [], false);
                } else {
                    Y.log('Couldn\'t find element with id: ' + params.id);
                }

            }
        };

    }, '@VERSION@', {requires: ['node', 'yui-later', 'io-base', 'querystring-stringify-simple','console']}
);