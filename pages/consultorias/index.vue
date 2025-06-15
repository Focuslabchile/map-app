<template>
  <div>
    <Modal :open.sync="showConsultorModal" title="¡Conviértete en consultor y deja tu huella técnica hoy! ">
      <h2 class="text-2xl font-bold text-accent mb-4">Postula como Consultor Técnico</h2>

      <p class="mb-4">
        ¿Tienes conocimientos técnicos y ganas de aportar? Escríbenos:
      </p>

      <ul class="mb-4 space-y-1 text-gray-800">
        <li>📧 <strong>Correo:</strong> <a href="mailto:rene@infomap.cl" class="text-blue-600 underline">rene@infomap.cl</a></li>
        <li>📱 <strong>WhatsApp:</strong> +56 9 5200 0241</li>
      </ul>

      <div class="mb-6">
        <h3 class="font-semibold mb-1 text-gray-700">Asunto del correo:</h3>
        <p class="italic text-gray-600">Postulación Consultor Técnico – [Tu Nombre]</p>
      </div>

      <div class="mb-6">
        <h3 class="font-semibold mb-2 text-gray-700">Incluye en el mensaje:</h3>
        <ul class="list-disc list-inside text-gray-700 space-y-1">
          <li>Breve presentación (nombre, experiencia)</li>
          <li>Áreas o temas en los que puedes aportar</li>
          <li>Tu disponibilidad horaria</li>
          <li>CV (opcional)</li>
          <li>Enlace a proyectos o portafolio (si tienes)</li>
        </ul>
      </div>

      <div class="mb-6">
        <h3 class="font-semibold mb-2 text-gray-700">Ejemplo de mensaje:</h3>
        <div class="bg-gray-100 p-4 rounded text-sm text-gray-700">
          <p>Hola equipo MZ,</p>
          <p class="mt-2">
            Mi nombre es <strong>[Tu Nombre]</strong>, soy <strong>[tu profesión]</strong> con experiencia en <strong>[tema]</strong>.
            Me gustaría participar como consultor técnico en su comunidad.
          </p>
          <p class="mt-2">
            Estoy disponible los días <strong>[martes y jueves por la tarde]</strong> y adjunto mi CV.
          </p>
          <p class="mt-2">
            Quedo atento a sus comentarios. ¡Gracias!
          </p>
          <p class="mt-2">
            Saludos,<br>
            <strong>[Tu Nombre]</strong><br>
            [Tu teléfono]
          </p>
        </div>
      </div>

      <div class="text-right">
        <button
          class="bg-accent text-white px-4 py-2 rounded hover:bg-accent/90 transition"
          @click="showConsultorModal = false">
          Cerrar
        </button>
      </div>
    </Modal>
    <!-- Hero Section -->
    <AppSection background="secondary">
      <h1 class="text-4xl md:text-5xl font-bold">Consultorías Técnicas <span class="text-accent">del Mes</span></h1>
      <Workshop :workshop="workshop" v-for="(workshop, i) in thisMonth" :key="i"/>
    </AppSection>

    <!-- Roadmap de Próximos Workshops Mejorado -->
    <AppSection background="primary">
      <div>
        <h2 class="text-3xl font-bold text-center mb-12">Inscríbete en las <span class="text-accent">próximas consultorias</span></h2>
        
        <!-- Julio 2025 -->
        <div v-for="(group, gi) in workshops" :key="gi" class="mb-12">
          <!-- Título dinámico: mes y año -->
          <h3
            class="text-2xl font-semibold text-accent mb-6 border-b border-accent pb-2">
            {{ group.mes }} {{ group.ano }}
          </h3>

          <!-- Cuadrícula de workshops para ese mes -->
          <div class="grid md:grid-cols-2 gap-6">
            <div
              v-for="(workshop, wi) in group.items"
              :key="`${group.mes}-${wi}`"
              class="secondary rounded-xl p-6 transition-colors"
            >
              <div class="flex gap-4">
                <!-- Imagen reducida -->
                <div class="flex-shrink-0">
                  <img
                    :src="workshop.foto_taller"
                    alt="Foto del taller"
                    class="w-24 h-24 object-cover rounded-lg"
                  >
                </div>
                <!-- Información -->
                <div class="flex-1">
                  <h4 class="text-lg font-bold mb-2">{{ workshop.workshop_name }}</h4>
                  <div class="text-sm text-light mb-2">
                    <span class="icon-calendar"></span>
                    {{ workshop.fecha_inicio }} - {{ workshop.fecha_termino }}
                  </div>
                  <div class="flex items-center gap-3 mb-3">
                    <img
                      :src="workshop.foto_instructor"
                      alt="Instructor"
                      class="w-8 h-8 rounded-full object-cover"
                    >
                    <div class="flex flex-wrap gap-2 text-xs mb-3 font-semibold">
                    <span class="bg-gray2 text-accent px-2 py-1 rounded">
                      {{ workshop.modalidad }}
                    </span>
                    <span v-if="workshop.certificado" class="bg-accent text-gray2 px-2 py-1 rounded">
                      {{ workshop.certificado }}
                    </span>
                  </div>
                  </div>
                </div>
              </div>
              <!-- Botones de acción -->
              <div class="mt-4 flex gap-2">
                <a
                  :href="workshop.temario"
                  target="_blank"
                  class="text-center font-semibold flex-1 py-2 px-3 text-sm border border-accent text-accent rounded
                        hover:bg-accent hover:text-white transition"
                >
                  Ver Temario
                </a>
                <nuxt-link
                  :to="`/consultorias/${workshop.id}`"
                  class="text-center flex-1 py-2 px-3 text-sm bg-accent text-white rounded hover:bg-accent/90 transition"
                >
                  Ver más
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppSection>

    <!-- Testimonios Carrusel -->
    <AppSection v-if="testimonials.length" background="secondary">
      <div class="text-center">
        <h2 class="text-4xl md:text-5xl font-bold mb-12">
          Testimonios de <span class="text-accent">participantes</span>
        </h2>
        <div class="overflow-hidden relative">
          <div class="inline-flex">
            <Testimonials :items="testimonials" :speed="10" />
          </div>
        </div>
      </div>
    </AppSection>

    <!-- Logos -->
    <AppSection background="primary">
      <div>
        <h2 class="text-4xl font-bold text-center mb-16">
          Clientes y <span class="text-accent">Partners</span>
        </h2>

        <!-- Carrusel de logos -->
        <div class="clients-carousel">
          <Logos :logos="logos" :speed="15" />
        </div>
      </div>
    </AppSection>
    <AppSection background="secondary" class="text-center py-16 px-8">
      <h2 class="text-4xl font-bold text-center mb-16">
        ¡Conviértete en consultor y <span class="text-accent">deja tu huella técnica hoy!</span>
      </h2>
      <button
        @click="showConsultorModal = true"
        class="text-center flex-1 py-2 px-3 text-md bg-accent text-white font-bold rounded hover:bg-accent/90 transition"
      >
        <span class="icon-notes">Inscríbete como consultor</span>
      </button>
    </AppSection>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showConsultorModal: false,
      thisMonth: [],
      logos: [],
      workshops: [],
      upcomingWorkshopsJulio: [],
      upcomingWorkshopsAgosto: [],
      countdownText: '',
    }
  },
  async asyncData(context) {
    const logos = await context.$api.get('api/inicio?populate=Header_Slider.Imagen').then(res => {
      return res.data.data.attributes.Header_Slider
      .map(el => {
        return {
          titulo: el.Titulo,
          bajada: el.Bajada,
          id: el.id,
          imagen: el.Imagen.data.attributes.url
        }
      })
    })
    const testimonials = await context.$api.get('api/testimonials')
      .then((res)=> {
        const data = res.data.data
        return data.map(el => {
          return {
            quote: el.attributes.mensaje,
            author: el.attributes.nombre,
            course: el.attributes.curso
          }
        })
      })
    return { logos, testimonials }
  },
  mounted() {
    this.updateCountdown();
    setInterval(this.updateCountdown, 1000);
    this.fetchWorkshops()
  },
  computed: {
    // Devuelve dos copias seguidas → [logo1, logo2, …, logoN, logo1, logo2, …]
    logosDuplicados() {
      return this.logos.length
      ? [...this.logos, ...this.logos]   // dos copias
      : [];
    }
  },
  methods: {
    async fetchWorkshops() {
      // 1. Traer y filtrar
      const res = await this.$api.get(
        'api/workshops?populate=foto_taller,foto_instructor,temario'
      );
      const now = Date.now();

      // 2. Normalizar y ordenar
      const monthNames = [
        'Enero','Febrero','Marzo','Abril','Mayo','Junio',
        'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
      ];
      const normalized = res.data.data
        .filter(w => new Date(w.attributes.fecha_inicio).getTime() > now)
        .sort((a, b) =>
          new Date(a.attributes.fecha_inicio) - new Date(b.attributes.fecha_inicio)
        )
        .map(w => {
          const attrs = w.attributes;
          const start = new Date(attrs.fecha_inicio);
          return {
            ...attrs,
            id: w.id,
            nombre: attrs.nombre,             // ejemplo de campo
            fecha_inicio: start.toLocaleDateString('es-CL', {
              year: 'numeric', month: 'long', day: 'numeric'
            }),
            fecha_termino: new Date(attrs.fecha_termino).toLocaleDateString('es-CL', {
              year: 'numeric', month: 'long', day: 'numeric'
            }),
            foto_taller: attrs.foto_taller?.data?.attributes.url,
            foto_instructor: attrs.foto_instructor?.data?.attributes.url,
            temario: attrs.temario?.data?.attributes.url,
            monthIndex: start.getMonth(),
            year: start.getFullYear()
          };
        });

      // 3. Agrupar por mes y año
      const grouped = normalized.reduce((acc, item) => {
        const key = `${item.year}-${item.monthIndex}`;
        if (!acc[key]) {
          acc[key] = {
            mes: monthNames[item.monthIndex],
            ano: String(item.year),
            items: []
          };
        }
        acc[key].items.push(item);
        return acc;
      }, {});

      // 4. Convertir a array y devolverlo
      const result = Object.values(grouped);
      
      // 5. Filtrar el mes actual
      const nowDate = new Date();
      const currentMonthName = monthNames[nowDate.getMonth()];
      const currentYearStr = String(nowDate.getFullYear());
      const currentGroup = result.find(g =>
        g.mes === currentMonthName && g.ano === currentYearStr
      );
      this.thisMonth = currentGroup ? currentGroup.items : [];
      this.workshops = result
    },
    updateCountdown() {
      const deadline = new Date("July 8, 2025 23:59:59").getTime();
      const now = new Date().getTime();
      const diff = deadline - now;
      
      if (diff < 0) {
        this.countdownText = "¡Cierre finalizado!";
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        this.countdownText = `Inscripciones cierran en: ${days}d ${hours}h ${minutes}m ${seconds}s`;
      }
    }
  }
}
</script>

<style lang="scss">
@import '~assets/scss/colors.scss';

// Iconos de ejemplo (puedes reemplazar por componentes reales o SVGs)
.icon-calendar::before { content: "\1F4C5 "; }
.icon-laptop::before { content: "\1F4BB "; }
.icon-book::before { content: "\1F4D8 "; }
.icon-certificate::before { content: "\1F4DC "; }
.icon-payments::before { content: "\1F4B3 ";}
.icon-notes::before { content: "\📝"}

/* Contenedor: oculta el desborde para el “deslizamiento infinito” */
.clients-carousel {
  position: relative;
  overflow: hidden;
  &:hover {
    .clients-track {
      animation-play-state: paused;
    }
  }
}

/* Pista de logos: fila horizontal que se anima continuamente */
.clients-track {
  @apply flex items-center whitespace-nowrap select-none;
  animation: scroll 30s linear infinite;     /* ajusta la duración a tu gusto */
}

/* Cada logo: tamaño coherente, margen y efecto gris que se aclara al pasar */
.client-logo {
  @apply h-20 w-auto mx-6 flex-shrink-0    /* mismo alto para todos; margen lateral */
         object-contain                    /* mantiene relación original */
         grayscale opacity-70 transition;  /* estilo inicial */

  &:hover {
    @apply grayscale-0 opacity-100;        /* resalta al pasar el cursor */
  }
}
.client-logo:first-child { margin-left: 0; }
/* Animación: desplaza la pista hacia la izquierda la mitad de su anchura
   (se duplica el set de logos en tu markup para lograr bucle perfecto) */
@keyframes scroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-190%); }
}

// Utilidad para truncar texto
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>