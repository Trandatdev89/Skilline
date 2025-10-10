<template>
  <div class="cardUI" style="width: 100%">
    <el-card>
      <div class="cardUI__wrap">
        <div class="cardUI__img">
          <img :src="props.img" alt="Danh muc"/>
        </div>
        <div class="cardUI__content">
          <div class="cardUI__content" style="text-align: center; margin-top: 20px;font-size: 24px;font-weight: bold">
            {{ props.title }}
          </div>
          <div v-if="props?.contentCourse">
            <div class="course-stats">
              <div class="stat">
                <el-icon>
                  <Document />
                </el-icon>
                <span>{{ props.contentCourse?.lecture || 0 }} bài giảng</span>
              </div>
              <div class="stat">
                <el-icon>
                  <User />
                </el-icon>
                <span>{{ props.contentCourse?.student || 0 }} học viên</span>
              </div>
            </div>
            <div class="cardUI__rating">
              <span>{{ props.contentCourse?.rate || 5 }}</span>
              <el-rate v-model="localRate" />
            </div>
            <div class="cardUI__price">
          <span>
            {{ props.contentCourse?.price }} VND
          </span>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import { Clock, Document, User } from '@element-plus/icons-vue'

  const props = defineProps<{
    title: string,
    img: string,
    contentCourse?: any
  }>()

  const localRate = ref(props.contentCourse?.rate ?? 0)

  watch(
      () => props.contentCourse?.rate,
      (newVal) => {
        localRate.value = newVal ?? 5
      }
  )
</script>

<style lang="scss" scoped>
  .cardUI {

    width: calc(100%/4 - 10px);

    &__img {
      width: 100%;
      height: 200px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 4px;
      }
    }
  }

  .course-stats {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;

    .stat {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: #666;

      .el-icon {
        font-size: 16px;
      }
    }
  }

</style>