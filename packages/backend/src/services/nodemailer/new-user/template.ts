type TParams = {
  firstname: string
  lastname: string
  email: string
  password: string
  url: string
}

export default function generateTemplate({ firstname, lastname, email, password, url }: TParams) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>Usuario Creado</title>
    </head>
    <body>
      <h1>Usuario Creado</h1>
      <p>
        Hola ${lastname}, ${firstname} <br />
        Su usuario ${email}, ha sido creado exitosamente.
      </p>
      <p>
        Tu contraseña es: <strong>${password}</strong>
      </p>
      <p>
        Para ingresar a la plataforma, haz click <a href="${url}">aquí</a>
      </p>
      <p>
        Por favor, cambia tu contraseña lo antes posible. 
      </p>
      <p>Gracias,</p>
      <p>El Equipo de Soporte</p>
    </body>
  </html>
`
}
