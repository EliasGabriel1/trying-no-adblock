# NÃO SEI O QUE EU FIZ

## ESTAVA NO MEU ALMOÇO E BRISEI, COMO SERIA PRA NUNCA NINGUEM CONSEGUIR FAZER UM ADBLOCK, AI TENTEI FAZER ISSO

PERGUNTEI PRO CHAT PQP E ELE TAMBEM NÃO SOUBE RESPONDER, PEDI AJUDA PRO CORNO E ELE SO POIS COMENTÁRIOS NO MEU CODIGO

a ideia seria desfrgmentar o video em takes de imagem, limitação é não ter audio, mas creio que é um passo pra ideia de manter o longpoling sem alterar o pacote do envio, ele vai receber o mesmo endpoint como se fosse o mesmo

essa ideia da pra usar no websocket da mesma forma

creio que o desafio atualmente é destruir o video e conseguir enviar pra stream sem precisar de outro endpoint ou algo do tipo

os impedimentos são varios, como são as regras pra anuncio no brasil, como funciona isso em produção, como isso funcionaria num projeto real, isso consumiria quanto de memoria no front, entre outros

Em resumo era pra ser um long poling, que usa 2 fronts, um que capta a camera e o outro que recebe, a ideia era alternar entre a stream e o video, uma das ideias foi usar o ffmpeg que de acordo com a dog ele fragmenta o video em imagens e envie pro front como longpoling, mas não deu certo porque esse negocio é um executavel que tu tem que usar na sua maquina, tipo o toobelt da vtex ou o terminar da tray

Meu olho começou piscar de estresse e eu decidi desistir mas depois volto tentar

teoricamente não era pra funcionar em lab pois precisaria fazer um docker com esse exe funcionando e 0 paciencia pra configurar um docker

fé, ese foi o readme de acordo com o que eu sei agora pois daqui alguns meses não saberei nem que eu fiz isso

Em resumo isso removeria toda maneira de ter uma adblock pois não teria como alterar o serverside ja que o serverside que enviaria o ad e não alteraria o stream, manteria o mesmo video
