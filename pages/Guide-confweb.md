---
id: guide-pt-confweb
title: Guia
---

[🇧🇷 Versão em Português](/pages/guide-pt-confweb) | [🇺🇸 English version](/pages/guide-confweb)

:::note

<aside>
🗨️ Bem-vindo e obrigado por utilizar a API do ConferênciaWeb. Nessa página você encontrará todas as informações relacionadas ao uso do ConferênciaWeb por API, e caso não encontre o que procura ou não consiga resposta para sua dúvida, entre em contato com nosso time através do **atendimento@rnp.br** - será um prazer ajudar.
</aside>
:::

Antes de seguir adiante com a leitura da documentação, tenha em mente que já existem diversas integrações prontas para utilizar o ConferênciaWeb em seu sistema. Para uso integrado a Ambientes Virtuais de Aprendizagem (Moodle, Brightspace, Canvas, entre outros), nós oferecemos integração plug-and-play via LTI (Learning Tools Interoperability), entre em contato para saber mais!

### Resumo do que você vai encontrar por aqui:

1. [Indicações de uso da integração via API e documentação essencial](#indicações-de-uso-da-integração-via-api-e-documentação-essencial)
2. [Diferença entre salas do Portal ConferênciaWeb e criadas usando API](#diferença-entre-salas-do-portal-conferênciaweb-e-criadas-usando-api)
3. [Armazenamento de dados](#armazenamento-de-dados)
4. [Customizações definidas a partir de regras de negócio](#customizações-definidas-a-partir-de-regras-de-negócio)
5. [Permissões e abertura da sala](#permissões-e-abertura-da-sala)
6. [Personalizações úteis via API](#personalizações-úteis-via-api)
7. [Encerramento da sessão](#encerramento-da-sessão)
8. [Gravações](#gravações)
9. [Uso incorporado em iframe](#uso-incorporado-em-iframe)
10. [Webhooks](#webhooks)
11. [Dados analíticos](#dados-analíticos)
12. [Novidades e melhorias](#novidades-e-melhorias)
13. [Perguntas frequentes](#perguntas-frequentes)

## Indicações de uso da integração via API e documentação essencial

Este artigo é focado na integração por meio de API, a qual recomendamos em dois casos:

- quando você deseja implementar algo muito diferente para um sistema que já dispõe de integração pronta;
- quando você necessita integrar algum sistema novo, para o qual ainda não existe integração desenvolvida.

O mais comum é que a integração por API seja utilizada quando se deseja integrar o ConferênciaWeb a um sistema próprio, para o qual não se dispõe de integração pronta.

A API do ConferênciaWeb é compatível com a API do BigBlueButton (BBB), de forma que se o produto já possui integração com o BBB será possível utilizar a mesma API para integrar com o ConferênciaWeb. A documentação da API está disponível [aqui](/docs/api/conference).

Ainda suportamos a API estendida de webhooks, que permite à integração receber eventos relevantes das sessões em andamento ou gravações: [webhook API](/api/conference/#tag/hooks).

O acesso à API normalmente é feito via bibliotecas que já existem e são mantidas pela comunidade. Usando bibliotecas, você não precisará se preocupar com a complexidade de geração e assinatura de chamadas válidas da API, você pode simplesmente utilizar os métodos fornecidos pela biblioteca para criar sua integração. Caso a biblioteca não ofereça acesso a um método ou parâmetro desejável para a sua integração, você pode modificar a biblioteca para este fim.

Entre as bibliotecas mais conhecidas e utilizadas para acessar a API estão:

- Biblioteca para PHP: https://github.com/bigbluebutton/bigbluebutton-api-php
- Biblioteca para Javascript: https://github.com/mconf/bigbluebutton-api-js
- Biblioteca para Ruby: https://github.com/mconf/bigbluebutton-api-ruby
- Biblioteca para Rails: https://github.com/mconf/bigbluebutton_rails
- Biblioteca para C#: https://github.com/nitinjs/bigbluebutton-api-dotnet
- Biblioteca para Java: https://github.com/bigbluebutton/bigbluebutton-api-java

Se você está procurando uma forma fácil de testar e começar a usar a API, confira esta pergunta da nossa FAQ: [De maneira resumida, o que preciso saber para uma integração simples?](#de-maneira-resumida-o-que-preciso-saber-para-uma-integração-simples)

## Diferença entre salas do Portal ConferênciaWeb e criadas usando API

Ao configurar uma integração do ConferênciaWeb com seu sistema, tenha em mente que essa integração conecta seu sistema diretamente a uma sala de videoconferência, e que esse fluxo de comunicação não passa pelo Portal ConferênciaWeb. Na prática, isso significa que a integração por API não precisa seguir nenhuma das regras de negócio do portal, ou seja, o modo com o qual cada sala é configurada e aberta pode ser totalmente adaptado para as regras de negócio do seu sistema. Pelos mesmos motivos, as informações sobre usuários, salas e gravações geradas via integração não estarão disponíveis no Portal ConferênciaWeb.

Se você precisar utilizar uma sala instanciada diretamente pelo portal, atente para o fato de que as regras de negócio (permissões de acesso e configuração da sala) obedecidas serão as do Portal ConferênciaWeb, e não as do seu sistema, mesmo que você esteja logado com uma conta da mesma instituição para a qual configurou a integração.

## Armazenamento de dados

Para implementar a integração é necessário o apontamento para um banco de dados (ou qualquer outro mecanismo para armazenamento de dados que você quiser usar) seu, pois é nele que estarão as informações de identificação dos usuários, das salas e das gravações.

Esse banco deverá ser modelado de acordo com as regras de negócio e produto do seu sistema. Um exemplo de como esta lógica pode ser montada é: cada usuário com papel de professor vai ter uma sala, então, cada sala terá um identificador único (ID) ligado ao usuário que é o "dono" da sala. Cabe enfatizar que essa sala não precisa ser cadastrada em nosso portal, visto que ela é criada em nossa infraestrutura via API quando o usuário clica para "abrir". Essa mesma sala fecha quando, por exemplo, o dono da sala clica para "encerrar sessão" (comando repassado para a API). No nosso produto (salas abertas via Portal ConferênciaWeb), o botão de encerrar sessão (ou fechar sala) encontra-se tanto dentro da sala quanto fora dela (visível para o dono), embora o lugar onde o botão de encerrar a sessão aparece também seja uma definição a ser feita por você.

Em resumo, é no seu banco de dados que informações sobre quem pode abrir uma sala, quais configurações serão aplicadas nela, como será a gerência dos participantes, entre outros estarão armazenadas.

## Customizações definidas a partir de regras de negócio

No que diz respeito a possibilidades de customização quando integrando o ConferênciaWeb por API: as possibilidades são muitas. Embora este seja um ponto positivo, exige que haja uma boa modelagem de produto e de negócio antes da implementação da parte técnica. Isso significa que antes de colocar a mão na massa, é necessário que seja definido como você quer que seja o sistema de videoconferência do seu produto e como você quer que ele seja acessado. Alguns exemplos de definições são:

- Como será a gerência de salas (Cada usuário tem sua sala? Usuários criam múltiplas salas? etc);
- Quem pode iniciar uma sessão na sala;
- Quem é moderador e quem é apenas participante;
- Quem pode acessar a sala e se precisa aprovação de moderadores para isso;
- Se a reunião poderá ser gravada;
- Personalizar a apresentação inicial;
- Configurar restrições dos participantes (limitar acesso a algumas funcionalidades);
- Habilitar e desabilitar funcionalidades automaticamente (iniciar vídeo automaticamente, esconder lista de usuários, etc).

Estes são apenas alguns pontos. Em breve disponibilizaremos a documentação detalhada completa acerca dessas definições.

Além da lógica por trás das salas, a API ainda oferece opções para monitoramento e listagem de recursos. Por exemplo, é possível buscar informações como o número de salas abertas no momento (além de efetuar operações sobre elas, como encerrá-las), como também apresentar uma listagem de todas as gravações feitas. Tudo isso pode ser feito por meio de diretivas que já existem na API.

## Permissões e abertura da sala

Do ponto de vista técnico, a sala existe na nossa infraestrutura do momento em que ela é instanciada pelo comando `create` da API até o momento em que ela é fechada, podendo ser fechada de diversas formas, detalhadas mais adiante neste mesmo artigo. Depois que a sala é encerrada ela não existe mais no ConferênciaWeb. A referência da sala vai existir na sua base de dados, assim como "quem são os usuários" também vai existir na sua base de dados. É muito importante criar um identificador de sala (`meetingID`) que seja único, pois é através dele que você fará referências à esta sala e a todos recursos relacionados à ela, como a sua gravação. Recomendamos que seja utilizado um GUID (https://pt.wikipedia.org/wiki/Identificador_%C3%BAnico_universal) para identificação única da sala.

Convém atentar: o `create` pode ser repetido sempre que for necessário, por isso uma boa prática de uso da API é usar a regra: se o usuário tem permissão de abrir a sala, que seja dado primeiro o `create` e depois o `join` (a chamada que autoriza e direciona o usuário para a sessão) do usuário para a sala, dessa forma garante-se que a sessão esteja aberta quando o sistema receber o `join` e isso minimiza as chances de erro no processo. Já quando o usuário não tem permissão de abrir a sala, deve ser feita a verificação de sala aberta e somente dar o `join` se a sala já estiver aberta (no papel de participante). Caso o `create` seja dado novamente quando a sala já estiver rodando, não vai retornar erro, vai apenas indicar que a sala já estava aberta.

Além do ID da sala, há outras duas informações que são passadas junto do comando `create` e que são muito importantes no uso da API:

- senha de moderador;
- senha de participantes.

Estes valores servem para identificar os usuários que vão conectar na sala e atribuir as devidas permissões. Através dessa senha, verifica-se se o usuário será participante ou moderador. Então, as senhas sempre devem ser diferentes (caso contrário todo mundo seria moderador!). Uma boa prática é não deixar o usuário final escolher essa senha, ou seja, mesmo que a sua sala seja protegida com senha, é melhor separar esta senha da senha usada na API. Veja um exemplo: em nosso portal, a sala pode ser privada, e se for privada o usuário define uma senha para ela. Essa senha é utilizada apenas pelo portal para decidir se o participante pode entrar na sala ou não. Depois de decidir isso, o portal decide qual o papel da pessoa nessa sala e então usa senhas internas (que só ele conhece e que são aleatórias), para indicar para a API qual o papel a pessoa deve assumir.

É importante que:

- ID da sala seja uma palavra grande e aleatória, idealmente um GUID;
- Senha de participante seja uma hash;
- Senha de moderador seja uma hash diferente da senha de participante;
- O usuário final não tenha visibilidade dessas senhas.

Outra informação importante em relação à API é que quando a sessão for criada podem ser passados metadados para esta sessão, que são dados da reunião ou aula que você deseja que estejam disponíveis posteriormente, também na gravação. Por exemplo: em uma integração que é usada por usuários com o papel “funcionários”, toda vez que determinada sala é aberta são passados os metadados de que a sessão é administrativa e então, posteriormente, esse metadado estará vinculado à gravação. Com isso, pode-se gerar analytics para saber, por exemplo, os setores que mais estão gravando e também gerenciar as gravações por setor. Não há limite de metadados, e sugerimos que sempre sejam passados, no mínimo, o endereço do site e a versão da integração, podendo estender-se a todas as informações que possam ser úteis para que essa sessão e/ou gravação possam ser indexadas posteriormente.

## Personalizações úteis via API

### Padronização de nomes

- Usar sempre letras minúsculas.
- Usar apenas letras, números e os caracteres `-` ou `_`.
- Não usar acentos.
- Como separador entre palavras, dar preferência para `-`, mas existem exceções:
  - No `join`, use `userdata-nome_da_variavel` para parâmetros do usuário. O prefixo `userdata-` é sempre o mesmo, mas para o nome das variáveis utilize `_` como separador. Usar `userdata-nome-da-variavel` **pode não funcionar** (e ter efeitos indesejados)! Você pode ver mais informações [neste link](https://github.com/bigbluebutton/bigbluebutton/blob/74d446dd08a22257c51f35ac40deec46a838a94c/bigbluebutton-html5/imports/api/users-settings/server/methods/addUserSettings.js#L31-L71).
  - No `create`, use `meta_nome-da-variavel` para parâmetros `meta`. O prefixo `meta_` é sempre o mesmo, mas para o nome das variáveis utilize `_` como separador. Usar `meta_nome_da_variavel` **pode não funcionar** (e ter efeitos indesejados)!

---

Parâmetros interessantes para serem utilizados no `create`:

- `autoStartRecording`: inicia a gravação automaticamente quando a sessão é aberta. Valor padrão: false
- `allowStartStopRecording`: determina se o moderador pode alterar o status de gravação. Valor padrão: true
- `disabledFeatures`: determina se determinada funcionalidade é desativada/escondida para os usuários. São possíveis valores, separados por vírgula:
  - privateChat
  - captions
  - polls
  - externalVideos
  - questions
  - streaming
  - breakoutRooms
  - sharedNotes

Parâmetros interessantes para serem utilizados no `join`:

- `userdata-bbb_auto_share_webcam`: abre automaticamente o preview de câmera após o usuário configurar o áudio. Valor padrão: false
- `userdata-bbb_hide_presentation`: esconde a apresentação ao entrar. Valor padrão: false
- `userdata-bbb_auto_join_audio`: ativa o áudio ao entrar na sala. Valor padrão: true
- `userdata-bbb_listen_only_mode`: ativa o modo ouvinte como opção para ativar o áudio. Valor padrão: true
- `userdata-bbb_skip_check_audio`: retira o teste de áudio. Valor padrão: false
- `userdata-bbb_override_default_locale`: define o idioma da sala virtual. Por padrão, a sala virtual utiliza o idioma do navegador. Valores possíveis são `pt-br` e `en-us`

## Encerramento da sessão

Existem quatro hipóteses para uma sessão ser encerrada:

- Quando um moderador seleciona a opção "Encerrar a sessão" dentro da sala. Qualquer moderador possui esta opção, e após confirmação, todos os usuários são desconectados, e a sala é fechada. Por conta disso, é importante ponderar sobre quem na sessão deve entrar como moderador, e quem deve entrar como participante. Não é uma boa prática que todos os participantes conectem como moderador, pois aumenta a chance de, por acidente, alguém encerrar a sessão.
- Quando todos os participantes desconectarem. Após todos saírem, a sala ainda permanece ativa por 5 minutos e depois é encerrada automaticamente.
- Por API através do método `end`. Não há confirmação para este método, ou seja, quando ele é chamado para uma sala rodando, essa sessão é encerrada imediatamente. Esta opção normalmente aparece nas integrações em algum local de gerência da sala, em que o usuário dono da sala consegue enxergar o status da sala rodando e tem a opção de encerrá-la clicando na interface da integração.
- Por inatividade. Caso uma sessão permaneça por uma hora sem nenhuma atividade, ela é encerrada automaticamente. É considerado atividade todas as ações de entrada e saída de usuários, ativação de microfone e câmera, início e fim de fala de um participante, anotações no quadro branco, entre outros. Esta condição existe para evitar o cenário de uma sessão rodando por tempo indeterminado por engano.

## Gravações

No que diz respeito a gravações de sessões, a API pode gerenciar, por exemplo, que a gravação seja despublicada (não mais poderá ser assistida), que seja apagada e que tenha metadados acrescentados posteriormente. Em nosso portal, por exemplo, utilizamos a atualização de metadados quando o usuário configura um título para a sessão e quando coloca descrição no agendamento - isso aciona o `updateRecordings`, que então atualiza o metadado dentro da gravação.

As gravações são disponibilizadas em dois formatos:

- `presentation`: utilizado para visualização no navegador, permite a navegação rápida clicando sobre as miniaturas dos slides e mensagens de bate-papo, acesso às notas compartilhadas e busca;
- `video`: é um arquivo MP4 de interface dinâmica de acordo com as funcionalidades utilizadas na conferência, utilizado tanto para visualização no navegador quanto para que o usuário baixe e armazene o vídeo para o seu computador.

No formato `presentation`, é possível personalizar a visualização através de parâmetros na URL:

- `l=media`: configura o layout da gravação para que apenas o vídeo fique visível na tela.

## Uso incorporado em iframe

Uma motivação para a escolha da integração por API também pode ser a possibilidade dar mais visibilidade à sua marca. Isso ocorre ao incorporar a sala através de um iframe dentro do próprio sistema integrado. Com isso você consegue manter a sua URL e, possivelmente, alguns componentes da sua identidade visual mesmo quando as pessoas estiverem dentro de uma conferência no ConferênciaWeb. Cabe sinalizar que atualmente existem algumas limitações para este modo, embora não comprometam a integridade do serviço.

Para tanto, é necessário passar algumas diretivas para o iframe conseguir capturar câmera e microfone. Um ponto importante é que no source do iframe não se coloque de fato a URL da API para entrar na sala. O ideal é utilizar uma URL interna do sistema, que tenha o papel de validar o usuário, identificar se o mesmo pode estar ali ou não, qual a sala que está tentando acessar, se tem ou não permissão de acesso, se vai acessar como convidado ou moderador, etc. No source sempre é definido qual é essa URL interna.

Para utilizar o iframe usamos o seguinte comando:

```
<iframe
  allow="microphone *; camera *; display-capture *; clipboard-read *; clipboard-write *; screen-wake-lock *;"
  allowfullscreen=""
  data-hj-allow-iframe=""
  mozallowfullscreen=""
  msallowfullscreen=""
  oallowfullscreen=""
  webkitallowfullscreen=""
  src="/conference/rooms/sheila-uberti/join?user%5Bemail%5D=&amp;user%5Bkey%5D=&amp;user%5Bname%5D=Felipe+Cecagno"/>
```

É essencial que o iframe seja servidor utilizando HTTPS, do contrário o navegador pode negar acesso aos dispositivos de câmera e microfone.

## Webhooks

É possível, através da API de webhooks, registrar um endpoint para receber eventos relevantes sobre sessões e gravações. Esse registro pode ser feito com granularidade de sessão (passando o `meetingID` na requisição `hooks/create`) ou global, para todas as sessões, conforme documentado [aqui](/docs/api/conference#tag/hooks).

Diferente da implementação original do BigBlueButton, nós modificamos o modelo de validação da integridade dos eventos emitidos, da seguinte forma:

- Ao registrar um webhook através do método `hooks/create`, é retornado um campo `authToken` na resposta em XML;
- O `authToken` deve ser salvo no banco para ser usado mais tarde na validação dos eventos recebidos;
- Quando o evento é recebido, nos headers HTTP virá um bearer com o valor do `authToken` - caso o valor não seja o mesmo, o evento deve ser rejeitado.

Para que sua implementação seja compatível com ConferênciaWeb e BigBlueButton, basta considerar na implementação que, caso o authToken não seja retornado ao registrar um hook, pode-se considerar que o `authToken` é igual ao _shared secret_ do serviço.

Os eventos emitidos pelo ConferênciaWeb são:

- meeting-created
- meeting-ended
- user-joined
- user-left
- rap-archive-ended
- rap-sanity-started
- rap-sanity-ended
- rap-process-started
- rap-process-ended
- rap-publish-started
- rap-publish-ended
- rap-published
- rap-unpublished
- rap-deleted

Para saber mais sobre as fases no processamento de gravações, acesse https://docs.bigbluebutton.org/development/recording.

## Dados analíticos

O ConferênciaWeb possui um recurso de callback para informações da sessão quando a sala é fechada. Esse callback traz a participação de cada usuário, incluindo tempo conectado, mensagens enviadas e tempo falando, o que pode ser utilizado para gerar analytics do serviço de vídeo.

O analytics callback do ConferênciaWeb é ativado através de metadados:

```bash
meta_analytics-callback-url=URL
```

Sendo `URL` a URL da integração que receberá o HTTP POST com os dados.

<details>
  <summary>Exemplo de body da requisição</summary>

```bash
{
  "version": "1.0",
  "meeting_id": "f59c62e3c4f1cb74d4ce488269b080126241317666a4404f8943b72ed381b7d3",
  "internal_meeting_id": "352a60fedcbc58a8675de586234db2674cdaf329-1691427974352",
  "data": {
    "metadata": {
      "analytics_callback_url": "hidden",
      "is_breakout": "false",
      "meeting_id": "f59c62e3c4f1cb74d4ce488269b080126241317666a4404f8943b72ed381b7d3",
      "meeting_name": "Laboral",
      "record": "true"
    },
    "duration": 1665,
    "start": "2023-08-07 14:06:14 -0300",
    "finish": "2023-08-07 14:33:59 -0300",
    "attendees": [
      {
        "ext_user_id": 45,
        "name": "Daronco",
        "moderator": true,
        "joins": [
          "2023-08-07 14:06:17 -0300"
        ],
        "leaves": [
          "2023-08-07 14:32:59 -0300"
        ],
        "duration": 1602,
        "recent_talking_time": "",
        "engagement": {
          "chats": 9,
          "talks": 8,
          "raisehand": 0,
          "emojis": 0,
          "poll_votes": 0,
          "talk_time": 26
        },
        "sessions": {
          "w_mdfahewpe3p1": {
            "joins": [
              {
                "timestamp": "2023-08-07 14:06:17 -0300",
                "userid": "w_mdfahewpe3p1",
                "ext_userid": 45,
                "event": "join",
                "remove": false
              }
            ],
            "lefts": [
              {
                "timestamp": "2023-08-07 14:32:59 -0300",
                "userid": "w_mdfahewpe3p1",
                "ext_userid": 45,
                "event": "left",
                "remove": false
              }
            ]
          }
        }
      },
      {
        "ext_user_id": 49,
        "name": "Camila",
        "moderator": true,
        "joins": [
          "2023-08-07 14:06:19 -0300"
        ],
        "leaves": [
          "2023-08-07 14:32:39 -0300"
        ],
        "duration": 1580,
        "recent_talking_time": "",
        "engagement": {
          "chats": 5,
          "talks": 26,
          "raisehand": 0,
          "emojis": 0,
          "poll_votes": 0,
          "talk_time": 83
        },
        "sessions": {
          "w_drso5grosuf7": {
            "joins": [
              {
                "timestamp": "2023-08-07 14:06:19 -0300",
                "userid": "w_drso5grosuf7",
                "ext_userid": 49,
                "event": "join",
                "remove": false
              }
            ],
            "lefts": [
              {
                "timestamp": "2023-08-07 14:32:39 -0300",
                "userid": "w_drso5grosuf7",
                "ext_userid": 49,
                "event": "left",
                "remove": false
              }
            ]
          }
        }
      },
      {
        "ext_user_id": 48,
        "name": "Julia R",
        "moderator": true,
        "joins": [
          "2023-08-07 14:06:20 -0300"
        ],
        "leaves": [
          "2023-08-07 14:32:19 -0300"
        ],
        "duration": 1559,
        "recent_talking_time": "",
        "engagement": {
          "chats": 6,
          "talks": 0,
          "raisehand": 0,
          "emojis": 0,
          "poll_votes": 0,
          "talk_time": 0
        },
        "sessions": {
          "w_ddfyo1b0eaee": {
            "joins": [
              {
                "timestamp": "2023-08-07 14:06:20 -0300",
                "userid": "w_ddfyo1b0eaee",
                "ext_userid": 48,
                "event": "join",
                "remove": false
              }
            ],
            "lefts": [
              {
                "timestamp": "2023-08-07 14:32:19 -0300",
                "userid": "w_ddfyo1b0eaee",
                "ext_userid": 48,
                "event": "left",
                "remove": false
              }
            ]
          }
        }
      },
      {
        "ext_user_id": 32,
        "name": "Jéssica",
        "moderator": true,
        "joins": [
          "2023-08-07 14:06:23 -0300"
        ],
        "leaves": [
          "2023-08-07 14:32:39 -0300"
        ],
        "duration": 1576,
        "recent_talking_time": "",
        "engagement": {
          "chats": 7,
          "talks": 0,
          "raisehand": 0,
          "emojis": 0,
          "poll_votes": 0,
          "talk_time": 0
        },
        "sessions": {
          "w_skxwisni2vkl": {
            "joins": [
              {
                "timestamp": "2023-08-07 14:06:23 -0300",
                "userid": "w_skxwisni2vkl",
                "ext_userid": 32,
                "event": "join",
                "remove": false
              }
            ],
            "lefts": [
              {
                "timestamp": "2023-08-07 14:32:39 -0300",
                "userid": "w_skxwisni2vkl",
                "ext_userid": 32,
                "event": "left",
                "remove": false
              }
            ]
          }
        }
      },
      {
        "ext_user_id": 46,
        "name": "Pedro",
        "moderator": true,
        "joins": [
          "2023-08-07 14:06:23 -0300"
        ],
        "leaves": [
          "2023-08-07 14:32:39 -0300"
        ],
        "duration": 1576,
        "recent_talking_time": "",
        "engagement": {
          "chats": 1,
          "talks": 0,
          "raisehand": 0,
          "emojis": 0,
          "poll_votes": 0,
          "talk_time": 0
        },
        "sessions": {
          "w_vmkps2dbdo3u": {
            "joins": [
              {
                "timestamp": "2023-08-07 14:06:23 -0300",
                "userid": "w_vmkps2dbdo3u",
                "ext_userid": 46,
                "event": "join",
                "remove": false
              }
            ],
            "lefts": [
              {
                "timestamp": "2023-08-07 14:32:39 -0300",
                "userid": "w_vmkps2dbdo3u",
                "ext_userid": 46,
                "event": "left",
                "remove": false
              }
            ]
          }
        }
      },
      {
        "ext_user_id": "w_pc3g5bjibj7r",
        "name": "Bárbara",
        "moderator": true,
        "joins": [
          "2023-08-07 14:06:32 -0300"
        ],
        "leaves": [
          "2023-08-07 14:07:39 -0300"
        ],
        "duration": 67,
        "recent_talking_time": "",
        "engagement": {
          "chats": 0,
          "talks": 8,
          "raisehand": 0,
          "emojis": 0,
          "poll_votes": 0,
          "talk_time": 20
        },
        "sessions": {
          "w_pc3g5bjibj7r": {
            "joins": [
              {
                "timestamp": "2023-08-07 14:06:32 -0300",
                "userid": "w_pc3g5bjibj7r",
                "ext_userid": "w_pc3g5bjibj7r",
                "event": "join",
                "remove": false
              }
            ],
            "lefts": [
              {
                "timestamp": "2023-08-07 14:07:39 -0300",
                "userid": "w_pc3g5bjibj7r",
                "ext_userid": "w_pc3g5bjibj7r",
                "event": "left",
                "remove": false
              }
            ]
          }
        }
      },
      {
        "ext_user_id": 12,
        "name": "Chris",
        "moderator": true,
        "joins": [
          "2023-08-07 14:06:38 -0300"
        ],
        "leaves": [
          "2023-08-07 14:31:49 -0300"
        ],
        "duration": 1511,
        "recent_talking_time": "",
        "engagement": {
          "chats": 4,
          "talks": 1,
          "raisehand": 0,
          "emojis": 0,
          "poll_votes": 0,
          "talk_time": 0
        },
        "sessions": {
          "w_z80qjjgpcaxn": {
            "joins": [
              {
                "timestamp": "2023-08-07 14:06:38 -0300",
                "userid": "w_z80qjjgpcaxn",
                "ext_userid": 12,
                "event": "join",
                "remove": false
              }
            ],
            "lefts": [
              {
                "timestamp": "2023-08-07 14:31:49 -0300",
                "userid": "w_z80qjjgpcaxn",
                "ext_userid": 12,
                "event": "left",
                "remove": false
              }
            ]
          }
        }
      },
      {
        "ext_user_id": 47,
        "name": "Penha",
        "moderator": true,
        "joins": [
          "2023-08-07 14:07:50 -0300"
        ],
        "leaves": [
          "2023-08-07 14:32:39 -0300"
        ],
        "duration": 1489,
        "recent_talking_time": "",
        "engagement": {
          "chats": 4,
          "talks": 0,
          "raisehand": 0,
          "emojis": 1,
          "poll_votes": 0,
          "talk_time": 0
        },
        "sessions": {
          "w_ubpikr2ejp2g": {
            "joins": [
              {
                "timestamp": "2023-08-07 14:07:50 -0300",
                "userid": "w_ubpikr2ejp2g",
                "ext_userid": 47,
                "event": "join",
                "remove": false
              }
            ],
            "lefts": [
              {
                "timestamp": "2023-08-07 14:32:39 -0300",
                "userid": "w_ubpikr2ejp2g",
                "ext_userid": 47,
                "event": "left",
                "remove": false
              }
            ]
          }
        }
      },
      {
        "ext_user_id": "w_sqhqruvnvzer",
        "name": "Bárbara",
        "moderator": true,
        "joins": [
          "2023-08-07 14:07:55 -0300"
        ],
        "leaves": [
          "2023-08-07 14:32:59 -0300"
        ],
        "duration": 1504,
        "recent_talking_time": "",
        "engagement": {
          "chats": 0,
          "talks": 232,
          "raisehand": 0,
          "emojis": 0,
          "poll_votes": 0,
          "talk_time": 970
        },
        "sessions": {
          "w_sqhqruvnvzer": {
            "joins": [
              {
                "timestamp": "2023-08-07 14:07:55 -0300",
                "userid": "w_sqhqruvnvzer",
                "ext_userid": "w_sqhqruvnvzer",
                "event": "join",
                "remove": false
              }
            ],
            "lefts": [
              {
                "timestamp": "2023-08-07 14:32:59 -0300",
                "userid": "w_sqhqruvnvzer",
                "ext_userid": "w_sqhqruvnvzer",
                "event": "left",
                "remove": false
              }
            ]
          }
        }
      }
    ],
    "files": [
      "default.pdf"
    ],
    "polls": [],
    "recorded_segments": [],
    "transfer_attendees": []
  }
}
```

</details>

O _content-type_ da requisição é `application/json`.

A validação de autenticidade do callback é realizada utilizando o header `authorization` do POST:

```bash
Authorization: Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTE1MTYwNjN9.CDvYEr-BjFGKKcRZ8UuCMGsJTsMPzlyBfAosbeB5ueb2lhF8QCb0QhymKTiwknBOf3GIi5w5JOZBNs1HqP3EJA
```

O token é um JWT assinado com o _shared secret_ da API e o algoritmo HS512. O processo de validação é realizado conforme pseudo-código abaixo:

```bash
jwt.verify(token, shared_secret, { algorithms: [ algorithm ] });
```

## Novidades e melhorias

Estamos constantemente trabalhando para aprimorar nossa solução, oferecendo aos clientes e usuários a melhor experiência possível em videoconferência. Novidades e melhorias são continuamente lançadas, e você pode acompanhar as atualizações [aqui](https://ajuda.rnp.br/conferenciaweb/ultimas-atualizacoes).

Sugestões são muito bem-vindas, a qualquer momento. Sinta-se à vontade para contatar-nos sempre que quiser compartilhar conosco um feedback ou sugestão ou mesmo para pedir ajuda.

## Perguntas frequentes

### De maneira resumida, o que preciso saber para uma integração simples?

- O ConferênciaWeb permitirá que você implemente uma lógica de negócio pensada por você;
- Você não precisará cadastrar usuários ou salas no ConferênciaWeb, isso será feito via API no momento do acesso;
- Cada sala é identificada por um `meetingID` gerado por você, preferencialmente um GUID;
- Determine a qual entidade no seu sistema estará vinculada cada sala - seja uma turma, seja um agendamento, seja um agente;
- Gere um `meetingID` para cada entidade e grave no banco;
- Não é esperado que você precise lidar com a complexidade de geração das URLs da API - utilize uma biblioteca pronta pra isso (veja [aqui](https://www.notion.so/Documenta-o-API-ConferênciaWeb-327d7f8f72894c5480cf2fa7804ef7bb?pvs=21));
- A sala existe no ConferênciaWeb no momento em que o método `CREATE` é chamado, e deixa de existir depois que a sala fecha - cada vez que a sala é utilizada, deve ser utilizado o método `CREATE`;
- Todas as chamadas à API são executadas no backend da sua aplicação. A única exceção é o método `JOIN`, que deve ser gerado no backend e o usuário é redirecionado para ela, conduzindo o mesmo para a sala correspondente;
- O _shared secret_ utilizado para assinar as chamadas da API deve ser conhecido somente pelo seu backend e em hipótese nenhuma deve ser passado para o frontend ou exposto para o usuário de alguma forma;
- No `CREATE` você irá definir os parâmetros `moderatorPW` e `attendeePW`. Eles podem ser qualquer coisa, desde que sejam diferentes, por exemplo, `mp` e `ap` respectivamente. Quando o `JOIN` for gerado, o `mp` é passado para que o usuário conecte como moderador, e o `ap` é passado para que o usuário conecte como participante;
- No `CREATE`, passe `record=true` para que a sessão possa ser gravada.
