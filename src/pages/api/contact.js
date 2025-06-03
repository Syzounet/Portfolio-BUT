// src/pages/api/contact.js
import nodemailer from 'nodemailer';

export async function POST({ request }) {
	try {
		// Récupération des données du formulaire
		const formData = await request.formData();
		const name = formData.get('name');
		const email = formData.get('email');
		const message = formData.get('message');

		// Validation des champs requis
		if (!name || !email || !message) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Tous les champs sont requis'
				}),
				{
					status: 400,
					headers: { 'Content-Type': 'application/json' }
				}
			);
		}

		// Validation de l'email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Format d\'email invalide'
				}),
				{
					status: 400,
					headers: { 'Content-Type': 'application/json' }
				}
			);
		}

		// Configuration du transporteur email (Gmail example)
		// Vous devez configurer vos variables d'environnement
		const transporter = nodemailer.createTransporter({
			service: 'gmail',
			auth: {
				user: process.env.EMAIL_USER, // Votre email
				pass: process.env.EMAIL_PASS  // Mot de passe d'application Gmail
			}
		});

		// Configuration de l'email
		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: 'Gauthier.34m@gmail.com', // Votre email de réception
			subject: `Nouveau message de ${name} - Portfolio`,
			html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #f97316 0%, #2563eb 100%); padding: 20px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Nouveau message de contact</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #374151; margin-top: 0;">Informations de contact</h3>
              <p><strong>Nom :</strong> ${name}</p>
              <p><strong>Email :</strong> ${email}</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <h3 style="color: #374151; margin-top: 0;">Message</h3>
              <div style="background: #f3f4f6; padding: 15px; border-radius: 6px; border-left: 4px solid #f97316;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px;">
                Message envoyé depuis votre portfolio le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}
              </p>
            </div>
          </div>
        </div>
      `,
			// Email de réponse automatique
			replyTo: email
		};

		// Envoi de l'email
		await transporter.sendMail(mailOptions);

		// Email de confirmation automatique à l'expéditeur
		const confirmationOptions = {
			from: process.env.EMAIL_USER,
			to: email,
			subject: 'Confirmation de réception - Gauthier Souquet',
			html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #f97316 0%, #2563eb 100%); padding: 20px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Merci pour votre message !</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 16px; color: #374151;">Bonjour ${name},</p>
            
            <p style="color: #6b7280; line-height: 1.6;">
              Merci de m'avoir contacté ! J'ai bien reçu votre message et je vous répondrai dans les plus brefs délais (généralement sous 24h).
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">Récapitulatif de votre message :</h3>
              <div style="background: #f3f4f6; padding: 15px; border-radius: 6px;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <p style="color: #6b7280; line-height: 1.6;">
              En attendant, n'hésitez pas à consulter mon profil LinkedIn ou à découvrir mes autres projets sur mon portfolio.
            </p>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://www.linkedin.com/in/gauthier-souquet-878aab202/" 
                 style="background: linear-gradient(135deg, #f97316 0%, #2563eb 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Mon LinkedIn
              </a>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #9ca3af; font-size: 14px;">
                Gauthier Souquet - Étudiant en Informatique<br>
                Cet email a été envoyé automatiquement, merci de ne pas y répondre.
              </p>
            </div>
          </div>
        </div>
      `
		};

		await transporter.sendMail(confirmationOptions);

		// Réponse de succès
		return new Response(
			JSON.stringify({
				success: true,
				message: 'Message envoyé avec succès !'
			}),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			}
		);

	} catch (error) {
		console.error('Erreur lors de l\'envoi de l\'email:', error);

		return new Response(
			JSON.stringify({
				success: false,
				error: 'Erreur lors de l\'envoi du message. Veuillez réessayer.'
			}),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' }
			}
		);
	}
}