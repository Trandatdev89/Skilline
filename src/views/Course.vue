<template>
  <div class="course-page">
    <div class="container">
      <el-breadcrumb separator="•" class="breadcrumb">
        <el-breadcrumb-item>Trang chủ</el-breadcrumb-item>
        <el-breadcrumb-item>Khóa học online</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="content-wrapper">
        <!-- Sidebar Filter -->
        <aside class="filter-sidebar">
          <div class="filter-section">
            <h3 class="filter-title">Bộ lọc</h3>

            <!-- Search by Title -->
            <div class="filter-group">
              <label class="filter-label">Tìm kiếm khóa học</label>
              <el-input
                  v-model="filters.searchTitle"
                  placeholder="Nhập tên khóa học..."
                  :prefix-icon="Search"
                  clearable
                  @input="applyFilters"
              />
            </div>

            <!-- Category Filter -->
            <div class="filter-group">
              <label class="filter-label">Danh mục</label>
              <el-radio-group v-model="filters.categories" @change="applyFilters">
                <el-radio
                    v-for="item in category"
                    :key="item.id"
                    :label="item.id"
                    class="category-checkbox"
                >
                  {{ item.name }}
                </el-radio>
              </el-radio-group>
            </div>

            <!-- Price Filter -->
            <div class="filter-group">
              <label class="filter-label">Khoảng giá</label>
              <el-radio-group v-model="filters.priceRange" @change="applyFilters">
                <el-radio label="all" class="price-radio">Tất cả</el-radio>
                <el-radio label="free" class="price-radio">Miễn phí</el-radio>
                <el-radio label="under-500k" class="price-radio">Dưới 500,000đ</el-radio>
                <el-radio label="500k-1m" class="price-radio">500,000đ - 1,000,000đ</el-radio>
                <el-radio label="1m-2m" class="price-radio">1,000,000đ - 2,000,000đ</el-radio>
                <el-radio label="above-2m" class="price-radio">Trên 2,000,000đ</el-radio>
              </el-radio-group>
            </div>

            <!-- Custom Price Range -->
            <div class="filter-group">
              <label class="filter-label">Hoặc tùy chỉnh giá</label>
              <div class="price-inputs">
                <el-input-number
                    v-model="filters.minPrice"
                    :min="0"
                    :max="10000000"
                    :step="100000"
                    placeholder="Từ"
                    controls-position="right"
                    @change="applyFilters"
                />
                <span class="price-separator">-</span>
                <el-input-number
                    v-model="filters.maxPrice"
                    :min="0"
                    :max="10000000"
                    :step="100000"
                    placeholder="Đến"
                    controls-position="right"
                    @change="applyFilters"
                />
              </div>
            </div>

            <!-- Reset Button -->
            <el-button
                type="danger"
                plain
                class="reset-btn"
                @click="resetFilters"
            >
              <el-icon><RefreshLeft /></el-icon>
              Xóa bộ lọc
            </el-button>
          </div>
        </aside>

        <!-- Course Grid -->
        <main class="course-content">
          <div class="result-header">
            <span class="result-count">Tìm thấy {{ filteredCourses.length }} khóa học</span>
            <el-select v-model="sortBy" placeholder="Sắp xếp" class="sort-select" @change="applySorting">
              <el-option label="Mới nhất" value="newest" />
              <el-option label="Giá thấp đến cao" value="price-asc" />
              <el-option label="Giá cao đến thấp" value="price-desc" />
              <el-option label="Tên A-Z" value="name-asc" />
            </el-select>
          </div>

          <div class="course-grid" v-if="filteredCourses.length > 0">
            <template v-for="course in filteredCourses" :key="course.id">
              <CardUi
                  @click="handleToLecture(course.id)"
                  :img="course?.thumbnail_url"
                  :title="course.title"
                  :content-course="course"
              />
            </template>
          </div>

          <el-empty
              v-else
              description="Không tìm thấy khóa học phù hợp"
              :image-size="200"
          />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRoute, useRouter } from 'vue-router'
  import CourseApi from '@/api/CourseApi.js'
  import { onMounted, ref, computed } from 'vue'
  import CardUi from '@/components/card/CardUi.vue'
  import { Search, RefreshLeft } from '@element-plus/icons-vue'
  import Category from '@/views/Category.vue'
  import CategoryApi from '@/api/CategoryApi.ts'

  const route = useRoute()
  const router = useRouter()

  const categoryId: any = route.query.categoryId || null
  const listCourse = ref<any>([])
  const sortBy = ref('newest')

  // Filter state
  const filters = ref({
    searchTitle: '',
    categories: [],
    priceRange: 'all',
    minPrice: null,
    maxPrice: null
  })

  // Mock categories - thay thế bằng API thực tế
  const category = ref<any>([])

  const getListCourse = async () => {
    let res
    if (categoryId) {
      res = await CourseApi.getListCourseByCategoryId(categoryId)
      filters.value.categories = [parseInt(categoryId)]
    } else {
      res = await CourseApi.getListCourseNotPagi()
    }
    listCourse.value = res.data
  }

  const filteredCourses = computed(() => {
    let result = [...listCourse.value]

    // Filter by title
    if (filters.value.searchTitle) {
      const searchTerm = filters.value.searchTitle.toLowerCase()
      result = result.filter(course =>
          course.title.toLowerCase().includes(searchTerm)
      )
    }

    // Filter by categories
    if (filters.value.categories.length > 0) {
      console.log("oki",filters.value.categories)
      result = result.filter(course =>
          filters.value.categories.includes(course.categoryId)
      )
    }

    // Filter by price range
    if (filters.value.priceRange !== 'all') {
      result = result.filter(course => {
        const price = course.price || 0
        switch (filters.value.priceRange) {
          case 'free':
            return price === 0
          case 'under-500k':
            return price > 0 && price < 500000
          case '500k-1m':
            return price >= 500000 && price <= 1000000
          case '1m-2m':
            return price > 1000000 && price <= 2000000
          case 'above-2m':
            return price > 2000000
          default:
            return true
        }
      })
    }

    // Filter by custom price range
    if (filters.value.minPrice !== null || filters.value.maxPrice !== null) {
      result = result.filter(course => {
        const price = course.price || 0
        const min = filters.value.minPrice || 0
        const max = filters.value.maxPrice || Infinity
        return price >= min && price <= max
      })
    }

    return result
  })

  const applyFilters = (value:any) => {
     console.log(filters.value);
  }

  const applySorting = () => {
    const courses = [...filteredCourses.value]

    switch (sortBy.value) {
      case 'price-asc':
        courses.sort((a, b) => (a.price || 0) - (b.price || 0))
        break
      case 'price-desc':
        courses.sort((a, b) => (b.price || 0) - (a.price || 0))
        break
      case 'name-asc':
        courses.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'newest':
      default:
        courses.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    }

    listCourse.value = courses
  }

  const resetFilters = () => {
    filters.value = {
      searchTitle: '',
      categories: categoryId ? [parseInt(categoryId)] : [],
      priceRange: 'all',
      minPrice: null,
      maxPrice: null
    }
    sortBy.value = 'newest'
  }

  const handleToLecture = (courseId: number) => {
    router.push(`/lecture?courseId=${courseId}`)
  }

  const getListCategory = async ()=>{
    const  res = await CategoryApi.getListCategory();
    category.value = res.data;
  }

  onMounted(() => {
    getListCourse();
    getListCategory();
  })
</script>

<style lang="scss" scoped>
  .course-page {
    padding: 20px;
    background-color: #f8f9fa;
    min-height: 100vh;

    .breadcrumb {
      margin-bottom: 30px;
      font-size: 14px;
      color: #666;
    }

    .content-wrapper {
      display: flex;
      gap: 30px;
      align-items: flex-start;
    }

    // Filter Sidebar Styles
    .filter-sidebar {
      width: 300px;
      flex-shrink: 0;
      background: white;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
      position: sticky;
      top: 20px;
      max-height: calc(100vh - 40px);
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 6px;
      }

      &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
      }

      &::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 10px;

        &:hover {
          background: #555;
        }
      }

      .filter-title {
        font-size: 20px;
        font-weight: 700;
        color: #333;
        margin: 0 0 24px 0;
        padding-bottom: 16px;
        border-bottom: 2px solid #f0f0f0;
      }

      .filter-group {
        margin-bottom: 28px;

        .filter-label {
          display: block;
          font-size: 15px;
          font-weight: 600;
          color: #333;
          margin-bottom: 12px;
        }

        .category-checkbox,
        .price-radio {
          display: flex;
          width: 100%;
          margin: 0 0 10px 0;
          padding: 8px 0;

          :deep(.el-checkbox__label),
          :deep(.el-radio__label) {
            font-size: 14px;
            color: #666;
          }
        }

        .price-inputs {
          display: flex;
          align-items: center;
          gap: 12px;

          .el-input-number {
            flex: 1;
          }

          .price-separator {
            color: #999;
            font-weight: 500;
          }
        }
      }

      .reset-btn {
        width: 100%;
        margin-top: 12px;
        height: 40px;
        font-weight: 600;
        border-radius: 8px;
      }
    }

    // Course Content Styles
    .course-content {
      flex: 1;
      min-width: 0;

      .result-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
        padding: 16px 20px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

        .result-count {
          font-size: 16px;
          font-weight: 600;
          color: #333;
        }

        .sort-select {
          width: 200px;
        }
      }

      .course-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 24px;
      }
    }
  }

  // Responsive Design
  @media (max-width: 1200px) {
    .course-page {
      .content-wrapper {
        flex-direction: column;
      }

      .filter-sidebar {
        width: 100%;
        position: static;
        max-height: none;
      }

      .course-content {
        .course-grid {
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        }
      }
    }
  }

  @media (max-width: 768px) {
    .course-page {
      padding: 15px;

      .filter-sidebar {
        padding: 20px;

        .filter-title {
          font-size: 18px;
        }
      }

      .course-content {
        .result-header {
          flex-direction: column;
          gap: 12px;
          align-items: stretch;

          .sort-select {
            width: 100%;
          }
        }

        .course-grid {
          grid-template-columns: 1fr;
        }
      }
    }
  }
</style>