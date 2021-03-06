/* javascript - backend */
$(document).ready(function() {

    /*
     * ------------------------------------------------------
     *  Seta o token nas chamadas AJAX
     * ------------------------------------------------------
     */

    $.ajaxSetup({ headers: { 'X-CSRF-Token' : jQuery('meta[name=_token]').attr('content') } });





    /*
     * ------------------------------------------------------
     *  Ao digitar no campo de pesquisa
     * ------------------------------------------------------
     */
    $(document).on('click', '.treeview a:first-child', function(){
        var e               = $(this),
            icon_last       = e.children('i:last-child');
            icon_last.toggleClass('fa-angle-up').toggleClass('fa-angle-down');
    });




    /*
     * ------------------------------------------------------
     *  Ao digitar no campo de pesquisa
     * ------------------------------------------------------
     */
    $(".sidebar-form input").on("keyup", function(e)
    {

        var teclas_ignorar = [17, 9, 16, 20, 27, 18, 13, 91, 37, 38, 39, 40];

        // Se apertou alguma tecla ignorável
        if( $.inArray(e.keyCode, teclas_ignorar) >= 0 )
        {
            return;
        }

        var obj = $(this);
        var buscar_por = $.trim(obj.val().toLowerCase());

        // Se estiver vazio
        if( buscar_por == '' )
        {
            // Mostra todas as opções
            $(".sidebar-menu li a").removeClass("hide");

            // Fecha todos os submenus exceto o que está ativo
            //$(".sidebar-form li.tem-submenu").not(".ativo").removeClass("open").find("ul").slideUp(0);

            return;
        }

        // Primeiro faz nos itens raiz
        $(".sidebar-menu > li > a").each(function(i)
        {
            var menu_opcao = $(this);
            var menu_opcao_texto = $(this).text().toLowerCase();

            (menu_opcao_texto.indexOf(buscar_por) >= 0) ? menu_opcao.removeClass("hide") : menu_opcao.addClass("hide");
        });

        // Agora faz nos itens de submenu
        $(".sidebar-menu > li > ul > li > a").each(function(i)
        {
            var menu_opcao = $(this);
            var menu_opcao_texto = $(this).text().toLowerCase();
            var pai = menu_opcao.closest(".treeview");
            var pai_aberto = pai.hasClass('active');

            if( menu_opcao_texto.indexOf(buscar_por) >= 0 )
            {

                menu_opcao.removeClass("hide");

                if( pai_aberto == false )
                {
                    // Adiciona a classe da li pai
                    pai.addClass('active');

                    // Abre/fecha o próximo ul
                    pai.children('ul').slideToggle(100);
                }

                pai.children("a").removeClass("hide")
            }
            else
            {
                menu_opcao.addClass("hide");
            }
        });

    });

    // Ao clicar no botao buscar
    $(".sidebar-form #search-btn").on("click", function(e){
        e.preventDefault();
    });





    /*
     * ------------------------------------------------------
     *  Validação do Formulario
     * ------------------------------------------------------
     */
    formValidate();

    $("#form-padrao").validate({
        submitHandler: function(form){
            $(form).submit();
        }
    });




    /*
     * ------------------------------------------------------
     *  Data e hora
     * ------------------------------------------------------
     */
    $(".data").datepicker({
        format: "dd/mm/yyyy",
        autoclose: true,
        todayBtn: true,
        language: 'pt-BR'
    });

    $('.hora').timepicker({
        autoclose: true,
        minuteStep: 5,
        showSeconds: false,
        showMeridian: false
    });

    $(".datahora").datetimepicker({
        format: "dd/mm/yyyy HH:ii",
        autoclose: true,
        todayBtn: true,
        language: 'pt-BR'
    });




    /*
     * ------------------------------------------------------
     *  Select
     * ------------------------------------------------------
     */
    if($().select2){
        $('.select, select[name="dataTable_length"]').select2();
    }




    /*
     * ------------------------------------------------------
     *  Maxlength
     * ------------------------------------------------------
     */
    if($().maxlength){
        $('input[maxlength], textarea[maxlength]').maxlength({
            limitReachedClass: 'label label-danger',
            alwaysShow: true,
            threshold: 5
        });
    }




    /*
     * ------------------------------------------------------
     *  Tags
     * ------------------------------------------------------
     */
    if($().tagsInput){
        $(".tags").each(function(){
            $(this).tagsInput({
                width: 'auto'
            });
        });
    }




    /*
     * ------------------------------------------------------
     *  Mascaras
     * ------------------------------------------------------
     */
    if( $.fn.mask )
    {
        $(".mascara-telefone").mask("(99) 9999-9999?9");
        $(".mascara-cep").mask("99999-999");
        $(".mascara-cpf").mask("999.999.999-99");
    }
    // Se o plugin foi carregado
    if( $.fn.maskMoney )
    {
        $(".mascara-dinheiro").maskMoney({
            thousands: '',
            decimal  : ','
        });
    }

    // Campo somente números
    $(".mascara-numero").on("keyup", function(e)
    {
        var obj = $(this);
        var qtd = obj.val();
        var qtd_numeros = qtd.replace(/[^0-9]/g, "");

        // Permite apenas numeros
        if( !/^[0-9]+$/.test(qtd) )
        {
            obj.val(qtd_numeros);
        }

        if( e.keyCode == 38 || e.keyCode == 40 )
        {
            if( isNaN(qtd_numeros) || qtd_numeros <= 0 )
            {
                qtd = 1;
            }

            if( e.keyCode == 38 )
            {
                qtd++
            }
            else if( e.keyCode == 40 )
            {
                qtd--;
                qtd = ( qtd > 0 ) ? qtd : 1;
            }

            obj.val(qtd);
        }
    });



    /*
     * ------------------------------------------------------
     *  Editor
     * ------------------------------------------------------
     */
    CKEDITOR.basePath = $('meta[name=base]').attr('content') + "/js/plugins/ckeditor/";
    CKEDITOR.config.contentsCss = CKEDITOR.basePath+"contents.css";

    var editors = $('textarea.editor');

    if(editors.length > 0 && typeof CKEDITOR !== "undefined") {
        $.each(editors, function(){
            var $this    = $(this),
                $toolbar = [];

            if(!$this.attr('id')) { $this.attr('id', 'txtRand_' + $.guid++); }

            $toolbar.push({ name: "clipboard", items: [] });
            $toolbar.push({ name: "basicstyles", items: [ "Bold", "Italic" ] });
            $toolbar.push({ name: "paragraph", items: [ "NumberedList", "BulletedList" ] });
            $toolbar.push({ name: "links", items: [ "Link", "Unlink" ]  });

            if($this.hasClass('simple')){
                $toolbar.push({ name: "clipboard", items: [ "Paste", "PasteText", "PasteFromWord", "-", "Undo", "Redo" ] });
                $toolbar.push({ name: "style", items: [ "FontSize", "TextColor" ] });
                $toolbar.push({ name: "paragraph", items: [ "JustifyLeft", "JustifyCenter", "JustifyRight", "JustifyBlock" ] });
                $toolbar.push({ name: "insert", items: [ "Image", "Table" ]});
            }

            CKEDITOR.replace($this.attr('id'), { toolbar: $toolbar });
        });
    }




    /*
     * ------------------------------------------------------
     *  Dropzone
     * ------------------------------------------------------
     */
    if($().dropzone) {
        var lstDropZone = $('.dropzone');
        lstDropZone.each(function (){
            var $this = $(this);
            if(!$this.attr('id')) { $this.attr('id', 'dzRand_' + $.guid++); }
            var name = !$this.data('name') ? 'arquivo_upload' : $this.data('name');
            var size = !$this.data('size') ? 10 : parseInt($this.data('size'));
            var url = $this.data('url');
            var placeholdinput = $this.data('placeholdinput');
            var nameinput = $this.data('nameinput');

            $this.dropzone({
                paramName: name,
                maxFilesize: size,
                addRemoveLinks: true,
                url: url,
                maxFiles: 20,
                parallelUploads: 20,
                dictCancelUpload: '',
                dictRemoveFile: '<i class="fa fa-times"></i>',
                uploadMultiple: true,
                autoProcessQueue : false,
                thumbnailWidth: 165,
                thumbnailHeight: 165,
                init: function() {

                    var myDropzone = this; // closure

                    $(document).on("click", '#submit-dropzone', function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        myDropzone.processQueue();
                    });

                    this.on("addedfile", function (file) {
                        var mini_form = '<div class="dz-mini-form"><input type="text" name="legenda" placeholder="Legenda" class="form-control col-xs-12" /><br><input type="number" name="ordem" placeholder="Ordem" class="form-control col-xs-12" /></div>';

                        $(file.previewElement).append(mini_form);
                        $(file.previewElement).find('.dz-remove').attr('tabindex', '-1');
                        $(file.previewElement).closest('.dropzone').find('.dz-preview').find('input').first().focus();
                    });
                    this.on("sendingmultiple", function (file, xhr, formData) {
                        jQuery(file).each(function(i, f){

                            $.each( $(f.previewElement).find('input') ,function(){
                                formData.append( $(this).attr('name')+'[]', $(f.previewElement).find('input[name="'+$(this).attr('name')+'"]').val() );
                            });
                        });
                    });
                    this.on("successmultiple", function (files, response) {
                        var remove = $('.dz-remove');
                        remove.html(remove.first().text());

                        if(!response.url) {
                            var redirect = $('#redirect').val();
                            window.location.href = redirect;
                        }
                    });
                    this.on("errormultiple", function (files, response) {
                        var remove = $('.dz-remove');
                        remove.html(remove.first().text());
                    });
                }
            });
        });
    }









});
