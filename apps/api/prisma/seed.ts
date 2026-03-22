import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Admin user
  const email = process.env.ADMIN_EMAIL || 'admin@askbi.pt';
  const password = process.env.ADMIN_PASSWORD || 'secret123';
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: { name: 'Admin ASKBI', passwordHash, role: 'admin', onboardingComplete: true },
    create: { email, name: 'Admin ASKBI', passwordHash, role: 'admin', onboardingComplete: true },
  });

  // Associação
  const assoc = await prisma.associacao.upsert({
    where: { id: 'assoc-madeira-001' },
    update: {},
    create: {
      id: 'assoc-madeira-001',
      nome: 'Associação Regional de Karate da Madeira',
      regiao: 'Madeira',
      email: 'geral@karate-madeira.pt',
      telefone: '+351 291 000 001',
    },
  });

  // Clubes
  const clubes = [
    { id: 'clube-kf', nome: 'Clube Karate Funchal', filiacaoNum: '0042', localidade: 'Funchal', presidente: 'João Rodrigues', email: 'geral@karatefunchal.pt', nipc: '508234789', estado: 'Afiliado', quotaEstado: 'Pago', filiadoDesde: 2008 },
    { id: 'clube-kcl', nome: 'Karate Câmara de Lobos', filiacaoNum: '0017', localidade: 'Câmara de Lobos', presidente: 'Manuel Vieira', email: 'kcl@karate-madeira.pt', nipc: '508100002', estado: 'Afiliado', quotaEstado: 'Pago', filiadoDesde: 2014 },
    { id: 'clube-km', nome: 'Karate Machico', filiacaoNum: '0031', localidade: 'Machico', presidente: 'Nuno Baptista', email: 'karate.machico@gmail.com', nipc: '508100003', estado: 'Suspenso', quotaEstado: 'EmAtraso', filiadoDesde: 2011 },
    { id: 'clube-sc', nome: 'Shotokan Caniço', filiacaoNum: '0055', localidade: 'Santa Cruz', presidente: 'Luísa Moniz', email: 'shotokan.canico@mail.pt', nipc: '508100004', estado: 'Afiliado', quotaEstado: 'Pendente', filiadoDesde: 2016 },
    { id: 'clube-aksa', nome: 'Academia Karate Santo António', filiacaoNum: '0063', localidade: 'Funchal', presidente: 'Pedro Faria', email: 'aksa@karate.pt', nipc: '508100005', estado: 'Afiliado', quotaEstado: 'Pago', filiadoDesde: 2019 },
  ];

  for (const c of clubes) {
    await prisma.clube.upsert({
      where: { filiacaoNum: c.filiacaoNum },
      update: {},
      create: { ...c, assocId: assoc.id },
    });
  }

  // Treinadores
  const treinadores = [
    { id: 'trein-001', nome: 'António Silva', email: 'antonio.silva@karatefunchal.pt', numCedula: 'T-0087', grau: 'III', dan: '3º Dan', cedulaValidade: new Date('2025-06-30') },
    { id: 'trein-002', nome: 'Paulo Jardim', email: 'paulo.jardim@kcl.pt', numCedula: 'T-0054', grau: 'II', dan: '2º Dan', cedulaValidade: new Date('2026-03-15') },
    { id: 'trein-003', nome: 'Carla Freitas', email: 'carla.freitas@shotokan.pt', numCedula: 'T-0112', grau: 'I', dan: '1º Dan', cedulaValidade: new Date('2025-09-30') },
    { id: 'trein-004', nome: 'Rui Pereira', email: 'rui.pereira@karatefunchal.pt', numCedula: 'T-0031', grau: 'III', dan: '4º Dan', cedulaValidade: new Date('2025-12-31') },
  ];

  for (const t of treinadores) {
    await prisma.treinador.upsert({
      where: { numCedula: t.numCedula },
      update: {},
      create: t,
    });
  }

  // Árbitros
  const arbitros = [
    { id: 'arb-001', nome: 'João Mota', nivel: 'Nacional', dan: '4º Dan', email: 'joao.mota@karate.pt' },
    { id: 'arb-002', nome: 'Carla Freitas', nivel: 'Regional', dan: '2º Dan', email: 'carla.freitas@shotokan.pt' },
    { id: 'arb-003', nome: 'Rui Pereira', nivel: 'Regional', dan: '3º Dan', email: 'rui.pereira@karatefunchal.pt' },
  ];

  for (const a of arbitros) {
    await prisma.arbitro.upsert({
      where: { id: a.id },
      update: {},
      create: a,
    });
  }

  // Competição demo
  await prisma.competicao.upsert({
    where: { compNum: 'C2025-004' },
    update: {},
    create: {
      id: 'comp-regional-2025',
      assocId: assoc.id,
      nome: 'Campeonato Regional da Madeira 2025',
      data: new Date('2025-05-03'),
      local: 'Pavilhão do Caniço',
      status: 'InscricoesAbertas',
      compNum: 'C2025-004',
    },
  });

  console.log('✓ Seed concluído');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    return prisma.$disconnect().then(() => process.exit(1));
  });
