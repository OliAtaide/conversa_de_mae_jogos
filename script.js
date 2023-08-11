let questoes;

$.ajax({
    url: 'db.json',
    dataType: "json",
    type: 'GET',
    success: function (_data) {
        questoes = _data.questoes[0];
        questoes.forEach(function (q, i) {
            let opcoes = '';
            q.opcoes.forEach(function (o, j) {
                opcoes += (
                    `<div class="form-check px-5 py-2 form">
                        <input class="form-check-input" type="radio" value="`+ j +`" name="questao_` + i + `">
                        <label class="form-check-label" for="flexCheckDefault">
                            `
                    +
                    o
                    +
                    `
                        </label>
                    </div>
                `
                )
            });
            console.log(q)
            $('.game-body').append(
                `
                <div class="card game-card" id="questao_` + i + `">
                    <div class="card-header">

                    </div>
                    <div class="card-body px-0">
                        <h6 class="card-title px-4">
                            `
                +
                q.titulo
                +
                `
                        </h6>
                        <div class="card-text">
                        `
                +
                opcoes
                +

                `
                        </div>
                        <h6 class="px-4 text-right" style="display: none;">
                            Correto!
                        </h6>
                        <h6 class="px-4 text-wrong" style="display: none;">
                            Errado!
                        </h6>
                        <div class="d-flex justify-content-end px-4">
                            <button type="button" class="btn btn-send w-auto" data-send="` + i + `">
                                Enviar
                            </button>
                            <button type="button" class="btn btn-next w-auto" style="display:none;" data-next="` + (i + 1) + `">
                                Continuar
                                <i class="bi bi-arrow-right-short"></i>
                            </button>
                        </div>
                    </div>
                </div>
                `
            )
        });
    }
})

$(document).on('click', '.btn-next', function () {
    $('.game-card').hide();
    var next = $(this).data('next');
    $('#questao_' + next).show();
    var percent = (next / questoes.length) * 100;
    $('.progress-bar').attr('aria-valuenow', percent).css('width', percent + '%');
    $('.progress-bar').html(Math.round(percent) + '%')
})

$(document).on('click', '.btn-send', function () {
    var send = $(this).data('send');
    const checked = $('input[name="questao_'+ send +'"]:checked');
    var val = checked.val();
    if (val == questoes[send].resposta) {
        checked.parent().addClass('form-check-right')
    }
    else{
        checked.parent().addClass('form-check-wrong')
        const response = $('input[name="questao_'+ send +'"][ value= ' +  questoes[send].resposta + ']');
        response.parent().addClass('form-check-response');
    }
    $('input[name="questao_' + send + '"]').prop('disabled', 'true');
    $('#questao_' + send + ' .btn-send').hide();
    $('#questao_' + send + ' .btn-next').show();
})