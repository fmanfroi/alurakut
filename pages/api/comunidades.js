import { SiteClient } from "datocms-client";

export default async function recebedorDeRequests(request, response) {
  if (request.method === "POST") {
    const TOKEN =  process.env.TOKEN_DATOCMS;    
    const client = new SiteClient(TOKEN);

    const registroCriado = await client.items.create({
      itemType: "971610",
      ...request.body
    });

    console.log(registroCriado);

    response.json({
      dados: "qq coisa",
      registroCriado: registroCriado,
    });
    return;
  }

  response.status(404).json({
      message: "Só tratamos o POST por hora :[ "
  });

}
