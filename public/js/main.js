
Vue.http.headers.common['X-CSRF-TOKEN'] = $("#token").attr("value");

Vue.directive('tinymce-editor',{ 
  	twoWay: true,
    bind: function() {
      var self = this;
      tinymce.init({
      	selector: '#editor',
        language:"ru",
        height: 300,
        fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
        plugins: [
        "advlist autolink lists link image charmap print preview hr anchor pagebreak",
        "searchreplace wordcount visualblocks visualchars code fullscreen",
        "insertdatetime media nonbreaking save table contextmenu directionality",
        "emoticons template paste textcolor colorpicker textpattern"
        ],
        toolbar: "insertfile undo redo | sizeselect | fontsizeselect | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media",
        setup: function(editor) {
        
        	// init tinymce
        	editor.on('init', function() {
 						tinymce.get('editor').setContent(self.value);
          });
          
          // when typing keyup event
          editor.on('keyup', function() {
          	var new_value = tinymce.get('editor').getContent(self.value);
            self.set(new_value)
          });
          editor.on('mouseout', function() {
          	var new_value = tinymce.get('editor').getContent(self.value);
            self.set(new_value)
          });
        }
      });
    },
    update: function(newVal, oldVal) {
    	// set val and trigger event
    	$(this.el).val(newVal).trigger('keyup');
    }
  
  })

var sportmanager = new Vue({
    el: '#sport-manager',
    data: {
        starts: [],
        pagination: {
            total: 0,
            per_page: 2,
            from: 1,
            to: 0,
            current_page: 1
        },
        offset: 4,
        image: '',
        tmc: '',
        formErrorsUpdate: '',
        fillItem: { 'id': '', 'title': '', 'description': '', 'date': '2012-05-15', 'time': '', 'photo': '' }
    },
    computed: {
        isActived: function () {
            return this.pagination.current_page;
        },
        pagesNumber: function () {
            if (!this.pagination.to) {
                return [];
            }
            var from = this.pagination.current_page - this.offset;
            if (from < 1) {
                from = 1;
            }
            var to = from + (this.offset * 2);
            if (to >= this.pagination.last_page) {
                to = this.pagination.last_page;
            }
            var pagesArray = [];
            while (from <= to) {
                pagesArray.push(from);
                from++;
            }
            return pagesArray;
        }
    },
    methods: {
        getStarts: function (page) {
            this.$http.get('/start?page=' + page).then(function (response) { // Success.
                this.starts = response.data.data.data;
                this.$set('pagination', response.data.pagination);
                this.formErrorsUpdate ='';
            });
        },

        editStart: function (start) {
            this.fillItem.title = start.title;
            this.fillItem.id = start.id;
            this.fillItem.date = start.date;
            this.fillItem.time = start.time;
            this.fillItem.photo = start.photo;
            this.fillItem.description = start.description;
            this.tmc = start.description;
            tinymce.get('editor').setContent(this.tmc);

        },
        deleteStart: function (id) {
            this.$http.delete('/start/' + id).then(function(response){
                this.changePage(this.pagination.current_page);
                this.fillItem = { 'id': '', 'title': '', 'description': '', 'date': '2012-05-15', 'time': '', 'photo': '' };
                toastr.warning('ЗАпись удалена.', 'Внимание!', { timeOut: 5000 });
                this.tmc='';
                tinymce.get('editor').setContent(this.tmc);
            });
        },
        createStart: function (id) {
            this.changePage(this.pagination.current_page);
            this.fillItem = { 'id': '', 'title': '', 'description': '', 'date': '2012-05-15', 'time': '', 'photo': '' };
            this.tmc='';
            tinymce.get('editor').setContent(this.tmc);
        },

        updateStart: function (id) {
            if (!id) {
                var input = this.fillItem;
                this.$http.post('/start', input).then(function(response) {
                    this.changePage(this.pagination.current_page);
                    this.fillItem = { 'id': '', 'title': '', 'description': '', 'date': '2012-05-15', 'time': '', 'photo': '' };
                    toastr.success('Запись успешно сохранена.', 'Обновление!', { timeOut: 5000 });
                    this.tmc='';
                    tinymce.get('editor').setContent(this.tmc);
                }, function(response){
                    this.formErrorsUpdate = response.data;
                    toastr.error(this.formErrorsUpdate, 'Ошибка!', { timeOut: 5000 });
                });
            }
            else {
                var input = this.fillItem;
                this.$http.put('/start/' + id, input).then(function(response){
                    this.changePage(this.pagination.current_page);
                    this.fillItem = { 'id': '', 'title': '', 'description': '', 'date': '2012-05-15', 'time': '', 'photo': '' };
                    toastr.success('Запись успешно сохранена.', 'Обновление!', { timeOut: 5000 });
                     this.tmc='';
                     tinymce.get('editor').setContent(this.tmc);
                }, function(response){
                    this.formErrorsUpdate = response.data;
                    toastr.error(this.formErrorsUpdate, 'Ошибка!', { timeOut: 5000 });
                });
            }
        },
        changePage: function (page) {
            this.pagination.current_page = page;
            this.getStarts(page);
        },
    },
    ready: function () {

        this.getStarts(this.pagination.current_page);
        $('#datepicker').bootstrapMaterialDatePicker
			({
				format: 'YYYY-MM-DD',
				lang: 'ru',
				weekStart: 1, 
				cancelText : 'Отмена',
				nowButton : true,
				switchOnClick : true,
                time:false
			});
        $('#time').bootstrapMaterialDatePicker
		({
				date: false,
				shortTime: false,
				format: 'HH:mm'
		});

        var xfiles = $("#filer_input").filer({
            limit: 1,
            maxSize: null,
            extensions: ["jpg", "png", "gif"],
            changeInput: '<div class="jFiler-input-dragDrop"><div class="jFiler-input-inner"><div class="jFiler-input-icon"><i class="icon-jfi-cloud-up-o"></i></div><div class="jFiler-input-text"><h3>Перетяните сюда изображения</h3> <span style="display:inline-block; margin: 15px 0">или</span></div><a class="jFiler-input-choose-btn blue">Выберите его</a></div></div>',
            showThumbs: false,
            theme: "dragdropbox",
            templates: {
                box: '<ul class="jFiler-items-list jFiler-items-grid"></ul>',
                item: '<li class="jFiler-item">\
						<div class="jFiler-item-container">\
							<div class="jFiler-item-inner">\
								<div class="jFiler-item-thumb">\
									<div class="jFiler-item-status"></div>\
									<div class="jFiler-item-thumb-overlay">\
										<div class="jFiler-item-info">\
											<div style="display:table-cell;vertical-align: middle;">\
												<span class="jFiler-item-title"><b title="{{fi-name}}">{{fi-name}}</b></span>\
												<span class="jFiler-item-others">{{fi-size2}}</span>\
											</div>\
										</div>\
									</div>\
									{{fi-image}}\
								</div>\
								<div class="jFiler-item-assets jFiler-row">\
									<ul class="list-inline pull-left">\
										<li>{{fi-progressBar}}</li>\
									</ul>\
									<ul class="list-inline pull-right">\
										<li><a class="icon-jfi-trash jFiler-item-trash-action"></a></li>\
									</ul>\
								</div>\
							</div>\
						</div>\
					</li>',
                itemAppend: '<li class="jFiler-item">\
							<div class="jFiler-item-container">\
								<div class="jFiler-item-inner">\
									<div class="jFiler-item-thumb">\
										<div class="jFiler-item-status"></div>\
										<div class="jFiler-item-thumb-overlay">\
											<div class="jFiler-item-info">\
												<div style="display:table-cell;vertical-align: middle;">\
													<span class="jFiler-item-title"><b title="{{fi-name}}">{{fi-name}}</b></span>\
													<span class="jFiler-item-others">{{fi-size2}}</span>\
												</div>\
											</div>\
										</div>\
										{{fi-image}}\
									</div>\
									<div class="jFiler-item-assets jFiler-row">\
										<ul class="list-inline pull-left">\
											<li><span class="jFiler-item-others">{{fi-icon}}</span></li>\
										</ul>\
										<ul class="list-inline pull-right">\
											<li><a class="icon-jfi-trash jFiler-item-trash-action"></a></li>\
										</ul>\
									</div>\
								</div>\
							</div>\
						</li>',
                progressBar: '<div class="bar"></div>',
                itemAppendToEnd: false,
                canvasImage: true,
                removeConfirmation: true,
                _selectors: {
                    list: '.jFiler-items-list',
                    item: '.jFiler-item',
                    progressBar: '.bar',
                    remove: '.jFiler-item-trash-action'
                }
            },
            dragDrop: {
                dragEnter: null,
                dragLeave: null,
                drop: null,
                dragContainer: null,
            },
            uploadFile: {
                url: "/upload",
                data: { _token: window.laravel },
                type: 'POST',
                enctype: 'multipart/form-data',
                synchron: true,
                beforeSend: function () { },
                success: function (data, itemEl, listEl, boxEl, newInputEl, inputEl, id) {
                    var parent = itemEl.find(".jFiler-jProgressBar").parent(),
                        new_file_name = JSON.parse(data),
                        filerKit = inputEl.prop("jFiler");
                    sportmanager.fillItem.photo = "images/" + new_file_name;
                    filerKit.files_list[id].name = new_file_name;
                    
                    itemEl.find(".jFiler-jProgressBar").fadeOut("slow", function () {
                        $("<div class=\"jFiler-item-others text-success\"><i class=\"icon-jfi-check-circle\"></i> Success</div>").hide().appendTo(parent).fadeIn("slow");
                    });
                    filerKit.reset();
                },
                error: function (el) {
                    var parent = el.find(".jFiler-jProgressBar").parent();
                    el.find(".jFiler-jProgressBar").fadeOut("slow", function () {
                        $("<div class=\"jFiler-item-others text-error\"><i class=\"icon-jfi-minus-circle\"></i> Error</div>").hide().appendTo(parent).fadeIn("slow");
                    });
                },
                statusCode: null,
                onProgress: null,
                onComplete: null
            },
            files: null,
            addMore: false,
            allowDuplicates: true,
            clipBoardPaste: true,
            excludeName: null,
            beforeRender: null,
            afterRender: null,
            beforeShow: null,
            beforeSelect: null,
            onSelect: null,
            afterShow: null,
            onRemove: function (itemEl, file, id, listEl, boxEl, newInputEl, inputEl) {
                var filerKit = inputEl.prop("jFiler"),
                    file_name = filerKit.files_list[id].name;

                $.post('/remove', { file: file_name });
            },
            onEmpty: null,
            options: null,
            dialogs: {
                alert: function (text) {
                    return alert(text);
                },
                confirm: function (text, callback) {
                    confirm(text) ? callback() : null;
                }
            },
            captions: {
                button: "Выберите изображение",
                feedback: "Выберите изображение",
                feedback2: "files were chosen",
                drop: "Перетяните изображение для загрузки",
                removeConfirmation: "Вы уверены, что хотите удалить файл?",
                errors: {
                    filesLimit: "Только {{fi-limit}} файл может быть загружен.",
                    filesType: "Только изображения.",
                    filesSize: "{{fi-name}} слишком больной! размер не должен превышать {{fi-maxSize}} MB.",
                    filesSizeAll: "Files you've choosed are too large! Please upload files up to {{fi-maxSize}} MB."
                }
            }
        });
    },

});