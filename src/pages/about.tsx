import { flexCenterContent } from '@/utils/cssInJsBlocks'
import { Box, Typography, Grid, Avatar } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'

export default function about() {
  return (
    <>
      <Typography variant="h4" fontSize={32} textAlign="center" mb={4}>
        OnMaps: Mapeando Ambientes Universitários
      </Typography>
      <Grid container>
        <Grid
          item
          xs={8}
          sx={{
            textAlign: 'justify',
            '& .MuiTypography-body2': {
              lineHeight: 1.7,
            },
          }}
        >
          <Typography variant="body2">
            Bem-vindo à página oficial do OnMaps, um projeto colaborativo e
            aberto voltado para o mapeamento de ambientes em universidades.
            Aqui, nossa comunidade se une para registrar informações precisas e
            detalhadas sobre os espaços físicos presentes nas instituições de
            ensino superior.
          </Typography>
          <Typography variant="h4" sx={styles.title}>
            Finalidade do Projeto
          </Typography>
          <Typography variant="body2">
            O objetivo principal do OnMaps é fornecer uma plataforma acessível e
            confiável para estudantes, professores, funcionários e visitantes
            das universidades encontrarem informações relevantes sobre os
            ambientes presentes no campus. Através do mapeamento completo e
            detalhado, pretendemos facilitar a navegação e tornar a experiência
            acadêmica mais enriquecedora para todos.
          </Typography>
          <Typography variant="body2" mt={2}>
            Além disso todos os dados registrados ficara em uma API do OnMaps
            fornecendo acesso aos dados do mapeamento, como informações sobre os
            ambientes universitários, localizações geográficas, horários de
            funcionamento e avaliações. Com essas informações acessíveis por
            meio da API, desenvolvedores poderão criar aplicativos, serviços e
            integrações que facilitem a busca por locais no campus, forneçam
            rotas personalizadas, exibam informações em tempo real e muito mais.
          </Typography>

          <Typography variant="h4" sx={styles.title}>
            Como Funciona
          </Typography>
          <Typography variant="body2">
            O projeto OnMaps é impulsionado pela comunidade. Convidamos e
            incentivamos colaboradores de todas as universidades a participarem
            do processo de mapeamento. Através de uma interface simples e
            intuitiva, os colaboradores podem adicionar informações sobre
            edifícios, salas de aula, laboratórios, bibliotecas, áreas de
            convivência, serviços disponíveis e muito mais. Esses registros
            contribuem para a construção de um mapa abrangente e atualizado,
            oferecendo uma visão completa da estrutura da universidade.
          </Typography>
          <Typography variant="h4" sx={styles.title}>
            Benefícios e Recursos
          </Typography>
          <ul
            style={{
              listStyleType: 'disc',
              marginLeft: 20,
            }}
          >
            <li>
              <Typography variant="body2" mt={2}>
                Navegação Simplificada: O OnMaps oferece uma ferramenta de
                navegação intuitiva que permite aos usuários encontrarem
                facilmente os locais desejados no campus. Com informações
                detalhadas sobre cada ambiente, como endereço, horário de
                funcionamento e descrição, é mais fácil planejar e otimizar o
                tempo gasto na universidade.
              </Typography>
            </li>
            <li>
              <Typography variant="body2" mt={2}>
                Conhecimento Compartilhado: Acreditamos na importância do
                compartilhamento de conhecimento. O OnMaps permitirá que
                estudantes, professores e funcionários contribuam com suas
                experiências e informações sobre os ambientes universitários,
                criando uma fonte de dados confiável e acessível para toda a
                comunidade.
              </Typography>
            </li>
            <li>
              <Typography variant="body2" mt={2}>
                Orientação para Visitantes: O OnMaps é uma ferramenta valiosa
                para visitantes, como estudantes em potencial, pais e
                convidados. Ao fornecer um panorama completo dos ambientes
                universitários, podemos ajudar essas pessoas a se familiarizarem
                com o campus antes mesmo de chegar fisicamente ao local.
              </Typography>
            </li>
            <li>
              <Typography variant="body2" mt={2}>
                Atualizações em Tempo Real: Mantemos o OnMaps constantemente
                atualizado, graças à colaboração contínua de nossos usuários. À
                medida que novas construções são concluídas, espaços são
                remodelados ou informações são alteradas, a comunidade pode
                adicionar e editar os dados, garantindo um banco de dados
                preciso e confiável.
              </Typography>
            </li>
          </ul>

          <Typography variant="h4" sx={styles.title}>
            Participe do Projeto OnMaps
          </Typography>
          <Typography variant="body2">
            Estamos em busca de colaboradores entusiasmados e apaixonados por
            suas universidades. Se você deseja fazer parte da iniciativa OnMaps
            e contribuir para a construção de um recurso valioso para a
            comunidade acadêmica, junte-se a nós!
          </Typography>
          <Typography variant="body2" fontWeight="bold" mt={2}>
            Massa de dados
          </Typography>
          <Typography variant="body2">
            Precisamos de pessoas comprometidas ao registro de ambientes de sua
            instituição de ensino superior. Se você é estudante, professor ou
            funcionário de uma universidade, pode ajudar a mapear os espaços
            físicos do campus. Quanto mais pessoas participarem, mais abrangente
            e detalhado será o mapa. Lembramos que o OnMaps é uma comunidade
            colaborativa, e seu envolvimento é fundamental para o sucesso e
            crescimento contínuo do projeto. Juntos, podemos criar a fonte
            definitiva de informações sobre ambientes universitários e oferecer
            uma experiência acadêmica aprimorada para todos.
          </Typography>
          <Typography variant="body2" fontWeight="bold" mt={2}>
            Desenvolvimento
          </Typography>
          <Typography variant="body2">
            Uma das principais iniciativas que estamos desenvolvendo é a criação
            de uma API pública para disponibilizar os dados do OnMaps para
            utilização em outros projetos. Acreditamos que essa API abrirá um
            mundo de possibilidades e colaboração, permitindo que
            desenvolvedores, pesquisadores e outras comunidades aproveitem os
            dados mapeados para criar recursos inovadores e melhorar ainda mais
            a experiência acadêmica.
          </Typography>
          <Typography variant="body2" fontWeight="bold" mt={2}>
            Reconhecimento
          </Typography>
          <Typography variant="body2">
            Como forma de reconhecimento, todos os colaboradores que fizerem
            contribuições significativas ao OnMaps serão incluídos em nossa
            Lista de Contribuidores. Essa lista, que será publicada em nosso
            site e em outras mídias relacionadas, destacará seus nomes e seu
            papel fundamental no desenvolvimento do projeto.
          </Typography>
          <Typography variant="body2" mt={2}>
            Além disso, como um membro da Lista de Contribuidores, você poderá
            aproveitar os benefícios dessa visibilidade. Isso inclui a
            possibilidade de demonstrar suas habilidades e conhecimentos para
            potenciais empregadores, parceiros de projeto e outros membros da
            comunidade. Essa exposição pode abrir portas para oportunidades
            futuras e estabelecer conexões valiosas em seu campo de atuação.
          </Typography>
          <Typography variant="h4" sx={styles.title}>
            Entre em Contato Conosco e Faça Parte do Projeto OnMaps
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <EmailIcon />
            <Typography variant="body2">gabriellimamoraes@gmail.com</Typography>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ ...flexCenterContent, flexDirection: 'column' }}>
            <Typography variant="h4" sx={{ ...styles.title, mb: 2 }}>
              Contribuidores
            </Typography>
            <Grid container rowSpacing={4}>
              <Grid item xs={6} sx={styles.containerContributor}>
                <Avatar
                  alt="Gabriel Lima"
                  src="https://avatars.githubusercontent.com/Gabriellimmaa"
                  sx={styles.img}
                />
                <Typography variant="body2">Gabriel Lima</Typography>
              </Grid>
              <Grid item xs={6} sx={styles.containerContributor}>
                <Avatar
                  alt="Gabriel Lima"
                  src="https://avatars.githubusercontent.com/FelipeFerreiraDev"
                  sx={styles.img}
                />
                <Typography variant="body2">Felipe Ferreira</Typography>
              </Grid>
              <Grid item xs={6} sx={styles.containerContributor}>
                <Avatar
                  alt="Gabriel Lima"
                  src="https://avatars.githubusercontent.com/lorenzoMalutta"
                  sx={styles.img}
                />
                <Typography variant="body2">Lorenzo Malutta</Typography>
              </Grid>
              <Grid item xs={6} sx={styles.containerContributor}>
                <Avatar
                  alt="Gabriel Lima"
                  src="https://avatars.githubusercontent.com/GeovaneRigonato"
                  sx={styles.img}
                />
                <Typography variant="body2">Geovane Rigonato</Typography>
              </Grid>
              <Grid item xs={12} sx={styles.containerContributor}>
                <Avatar
                  alt="Gabriel Lima"
                  src="https://avatars.githubusercontent.com/Jh0wjso"
                  sx={styles.img}
                />
                <Typography variant="body2">Jhonatan Silvério</Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

const styles = {
  title: {
    my: 1,
    mt: 3,
    fontSize: 24,
  },
  img: {
    width: 84,
    height: 84,
    fontSize: 24,
    margin: 'auto',
    mb: 2,
  },
  containerContributor: {
    textAlign: 'center',
  },
}
