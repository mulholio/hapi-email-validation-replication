const Hapi = require("@hapi/hapi");
const Joi = require("@hapi/joi");

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  await server.start();

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "Request is OK";
    },
    options: {
      validate: {
        query: Joi.object({
          email_addresses: Joi.array()
            .items(Joi.string().email().trim().lowercase())
            .single(),
        }),
      },
    },
  });

  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
