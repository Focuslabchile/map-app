<template>
  <AppSection>
    <h2>Herramientas</h2>
    <div class="tabs">
      <div class="filters text-2xl">
        <InputRadio
          @update="(val) => toolsTab = val"
          group-name="tool_type"
          :value="toolsTab"
          :options="['GIS Chile', 'Gráfico logaritmico']"
        />
      </div>
      <div class="tab-content">
        <Tools v-if="toolsTab === 'Gráfico logaritmico'" />
        <Map v-if="toolsTab === 'GIS Chile'">
          <template slot='description'>
            <p class="my-8">GIS Chile es una innovadora iniciativa de ingeniería desarrollada por M&Z, cuyo objetivo principal es crear un repositorio accesible de estudios de mallas de tierra para beneficio de la comunidad en general. Al recopilar y poner a disposición información valiosa sobre mallas de tierra, este proyecto busca impulsar el desarrollo y la colaboración en la ingeniería nacional, permitiendo a profesionales y entusiastas acceder a un amplio espectro de conocimientos y prácticas en el campo. GIS Chile invita a expertos y profesionales a contribuir al crecimiento de este repositorio enviando sus propios estudios de mallas de tierra al correo electrónico <strong>estudios@infomap.cl</strong>. Al participar en este proyecto, estarás ayudando a construir una base sólida para el avance de la ingeniería eléctrica y geofísica en Chile, promoviendo el intercambio de información y fortaleciendo la cooperación entre los profesionales del sector.</p>
          </template>
        </Map>
      </div>
    </div>
  </AppSection>
</template>
<script>
export default {
  name: 'Herramientas',
  data() {
    return {
      toolsTab: 'GIS Chile'
    }
  }
}
</script>
<style lang="scss">
.tabs {
  .tab {
    &.tab-active {
      background-color: #f5f5f5;
      color: blue;
    }
  }
}
</style>