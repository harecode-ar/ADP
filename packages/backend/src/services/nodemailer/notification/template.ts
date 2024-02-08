type TParams = {
  firstname: string
  lastname: string
  url: string
  title: string
  category: string
}

export default function generateTemplate({ firstname, lastname, url, title, category }: TParams) {
  return `
  <!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
    .container { max-width: 600px; margin: 20px auto; background: #ffffff; padding: 20px; border: 1px solid #dddddd; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
    .header { color: #444444; background-color: #e7e7e7; text-align: center; padding: 20px 0; border-bottom: 2px solid #dddddd; }
    .header h2 { margin: 0; }
    .content { color: #555555; padding: 20px; text-align: left; line-height: 1.6; }
    .content p { margin: 20px 0 10px 0; }
    .content .button-container { text-align: center; }
    .content a.button { background-color: #007bff; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;}
    .footer { background-color: #f9f9f9; color: #666666; text-align: center; padding: 20px; font-size: 0.9em; border-top: 1px solid #dddddd; }
</style>
</head>
<body>
<div class="container">
    <div class="header">
        <h2>Notificación: ${category}</h2>
    </div>
    <div class="content">
        <p>Estimado/a ${firstname} ${lastname},</p>
        <p>Ha recibido la siguiente notificación:</p>
        <em>${title}</em>
        <p>Para ver esta notificación, por favor haga clic en el botón a continuación:</p>
        <p class="button-container"><a href="${url}" class="button">Ver Notificación</a></p>
    </div>
    <div class="footer">
        <p>Este es un correo electrónico generado automáticamente, por favor no responda a este mensaje.</p>
    </div>
</div>
</body>
</html>
`
}
