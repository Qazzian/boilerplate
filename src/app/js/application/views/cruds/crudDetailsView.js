define(['jquery', 'hbs!templates/cruds/crudDetailsView', 'backbone', 'marionette'],
    function ($, template, Backbone) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            template:template,
            events:{
                'click #btnEditModal' : 'showEditModel',
                'click .btn-save-model' : 'editModel',
                'click .btn-reset-model' : 'resetModelForm'
            },

            onFormError:function(model,errors,options){
                if(errors) {
                    for(var field in errors) {
                        if(errors.hasOwnProperty(field)){
                            var group = $(".form-group."+field,this.$el).addClass("has-error");
                            if(!group.length) {
                                throw new Error('Failed to parse error on form');
                            }

                            group.prepend('<p class="error-message bg-danger">'+errors[field]+'</p>');
                        }
                    }
                }
            },
            applyModel:function(model){
                if(model) {
                    this.model = model;
                }
                this.render();
            },
            showEditModel:function(){
                $('#crudDetailsEdit',this.$el).modal('toggle');
            },
            editModel:function(){
                var form = $("#frmCrudDetailsEdit",this.$el);
                var values = {
                    comments: $("#gruntModel_comments",form).val() ,
                    name :{
                        first: $("#gruntModel_firstName",form).val(),
                        last:$("#gruntModel_lastName",form).val()
                    }
                };

                //clean error messages
                $('.error-message',this.$el).remove();
                $('.has-error',this.$el).removeClass('has-error');

                this.listenToOnce(this.model,"invalid",this.onFormError);
                var validated = this.model.set(values,{
                    validate: true
                });
                if(validated) {
                    //close modal
                    this.stopListening(this.model,"invalid");

                    $('#crudDetailsEdit',this.$el).modal('toggle');
                    //rerender view
                    this.applyModel();
                }
            } ,
            resetModelForm:function(){
                var form = $("#frmCrudDetailsEdit",this.$el);
                $("#gruntModel_comments",form).val(this.model.get('comments'));
                var name = this.model.get('name');
                $("#gruntModel_firstName",form).val(name.first);
                $("#gruntModel_lastName",form).val(name.last);

                //clean error messages
                $('.error-message',this.$el).remove();
                $('.has-error',this.$el).removeClass('has-error');
            }
        });
    });