<?php

use App\Models\Configuracao;
use Illuminate\Database\Seeder;

class ConfiguracaoTabelaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        Configuracao::create([
            'nome_site'         => '',
            'titulo_site'       => '',
            'descricao'         => '',
            'palavra_chave'     => '',

            'smtp_servidor'         => '',
            'smtp_porta'            => '',
            'smtp_seguranca'        => '',
            'smtp_usuario'          => '',
            'smtp_email_resposta'   => '',
            'smtp_senha'            => '',

            'social_facebook'   => '',
            'social_twitter'    => '',
            'social_google_plus'=> '',
            'social_instagram'  => '',
            'social_linkedin'   => '',
            'social_skype'      => '',

            'google_analytics'  => '',
            'google_tag_manager'=> '',
            'analises_outros'   => '',

            'contato_email'             => '',
            'contato_emailcopia'        => '',
            'contato_emailcopiaoculta'  => '',

            'orcamento_email'             => '',
            'orcamento_emailcopia'        => '',
            'orcamento_emailcopiaoculta'  => ''

        ]);

    }
}
