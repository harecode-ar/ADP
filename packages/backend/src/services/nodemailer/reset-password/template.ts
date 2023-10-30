type TParams = {
  firstname: string
  lastname: string
  email: string
  resetLink: string
}

export default function generateTemplate({ firstname, lastname, email, resetLink }: TParams) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>Recuperación de Contraseña</title>
    </head>
    <body>
      <h1>Recuperación de Contraseña</h1>
      <p>
        Hola ${lastname}, ${firstname} <br />
        usuario: ${email}
      </p>
      <p>
        Recibimos una solicitud para restablecer tu contraseña. Si no solicitaste esto, puedes
        ignorar este correo electrónico.
      </p>
      <p>Si necesitas restablecer tu contraseña, haz clic en el siguiente enlace:</p>
      <a href="${resetLink}">Restablecer Contraseña</a>
      <p>Este enlace expirará en 24 horas.</p>
      <p>
        Si tienes algún problema para restablecer tu contraseña, por favor contacta al equipo de
        soporte.
      </p>
      <p>Gracias,</p>
      <p>El Equipo de Soporte</p>
    </body>
  </html>
`
}
