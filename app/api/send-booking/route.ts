import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, whatsapp, date, time } = body;

    // Configuração do servidor de e-mail (Ex: Gmail)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Seu e-mail (ex: seucao@gmail.com)
        pass: process.env.EMAIL_PASS, // Senha de App do Google (Não é a senha normal!)
      },
    });

    const adminEmail = process.env.EMAIL_USER; // E-mail que vai receber os avisos

    // 1. E-mail para VOCÊ (Admin)
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: adminEmail,
      subject: `Novo Agendamento: ${name}`,
      html: `
        <h2>Novo Agendamento Solicitado</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>WhatsApp:</strong> ${whatsapp}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Data:</strong> ${date}</p>
        <p><strong>Hora:</strong> ${time}</p>
        <p><em>Aguarde a confirmação do pagamento via Pix pelo cliente.</em></p>
      `,
    });

    // 2. E-mail para o CLIENTE
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Sua pré-reserva foi recebida!`,
      html: `
        <h2>Olá, ${name}!</h2>
        <p>Recebemos sua solicitação de agendamento para <strong>${date} às ${time}</strong>.</p>
        <p>Para confirmar definitivamente sua vaga, por favor realize o pagamento através do nosso link Pix:</p>
        <br/>
        <a href="https://nubank.com.br/pagar/seu-link-pix-aqui" style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
          Pagar via Pix
        </a>
        <br/><br/>
        <p>Em caso de dúvidas, responda este e-mail.</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}