<template>
  <div class="cart-container">
    <!-- Breadcrumb -->
    <el-breadcrumb separator="•" class="breadcrumb">
      <el-breadcrumb-item>Trang chủ</el-breadcrumb-item>
      <el-breadcrumb-item>Đơn hàng</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Title -->
      <div class="section-header">
        <h2 class="section-title">
          Thông tin khóa học
          <span class="course-count">(1 Khóa học)</span>
        </h2>
      </div>

      <!-- Cart Table -->
      <div class="cart-section">
        <div class="table-header">
          <div class="header-item course-col">Khóa học</div>
          <div class="header-item price-col">Giá</div>
          <div class="header-item action-col">Xóa</div>
        </div>

        <!-- Course Item -->
        <div class="course-item">
          <div class="course-info">
            <div class="course-image">
              <img
                  src="https://via.placeholder.com/100x80/4A90E2/ffffff?text=C++"
                  alt="Course thumbnail"
                  class="thumbnail"
              />
            </div>
            <div class="course-details">
              <h3 class="course-title">
                Học Lập Trình C qua 170 bài giảng, 350 bài tập thực hành và 200 câu trắc nghiệm (Update 2025)
              </h3>
            </div>
          </div>

          <div class="course-price">
            <span class="price-amount">1,099,000</span>
            <span class="currency">VND</span>
          </div>

          <div class="course-action">
            <el-button
                type="danger"
                :icon="Delete"
                circle
                size="small"
                @click="removeCourse"
            />
          </div>
        </div>
      </div>

      <!-- Summary Section -->
      <div class="summary-section">
        <div class="summary-row">
          <span class="summary-label">Tổng tiền</span>
          <span class="summary-value">1,099,000 VND</span>
        </div>

        <el-button
            type="primary"
            size="large"
            class="checkout-btn"
            @click="confirmOrder"
        >
          Xác nhận giỏ hàng
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { Delete } from '@element-plus/icons-vue'
  import { ElMessage, ElMessageBox } from 'element-plus'

  // Reactive data
  const courseCount = ref(1)
  const totalAmount = ref(1099000)

  // Methods
  const removeCourse = () => {
    ElMessageBox.confirm(
        'Bạn có chắc chắn muốn xóa khóa học này khỏi giỏ hàng?',
        'Xác nhận xóa',
        {
          confirmButtonText: 'Xóa',
          cancelButtonText: 'Hủy',
          type: 'warning',
        }
    )
        .then(() => {
          // Remove course logic here
          courseCount.value = 0
          totalAmount.value = 0
          ElMessage({
            type: 'success',
            message: 'Đã xóa khóa học khỏi giỏ hàng',
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Đã hủy thao tác',
          })
        })
  }

  const confirmOrder = () => {
    if (courseCount.value === 0) {
      ElMessage({
        type: 'warning',
        message: 'Giỏ hàng trống, vui lòng thêm khóa học',
      })
      return
    }

    // Navigate to checkout or payment page
    ElMessage({
      type: 'success',
      message: 'Chuyển đến trang thanh toán...',
    })
  }

  // Format currency
  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('vi-VN')
  }
</script>

<style lang="scss" scoped>
  .cart-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f9fa;
    min-height: 100vh;
  }

  .breadcrumb {
    margin-bottom: 20px;

    :deep(.el-breadcrumb__item) {
      .el-breadcrumb__inner {
        color: #666;
        font-weight: normal;
      }

      &:last-child .el-breadcrumb__inner {
        color: #333;
        font-weight: 500;
      }
    }
  }

  .main-content {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .section-header {
    padding: 20px 24px;
    border-bottom: 1px solid #e8e8e8;
  }

  .section-title {
    font-size: 24px;
    font-weight: 600;
    color: #333;
    margin: 0;
  }

  .course-count {
    color: #1890ff;
    font-weight: normal;
  }

  .cart-section {
    padding: 0;
  }

  .table-header {
    display: grid;
    grid-template-columns: 1fr 120px 80px;
    gap: 20px;
    padding: 16px 24px;
    background-color: #f5f7fa;
    border-bottom: 1px solid #e8e8e8;
  }

  .header-item {
    font-weight: 600;
    color: #666;
    font-size: 14px;
  }

  .course-col {
    color: #1890ff;
  }

  .price-col {
    text-align: center;
  }

  .action-col {
    text-align: center;
  }

  .course-item {
    display: grid;
    grid-template-columns: 1fr 120px 80px;
    gap: 20px;
    padding: 20px 24px;
    border-bottom: 1px solid #f0f0f0;
    align-items: center;
  }

  .course-info {
    display: flex;
    gap: 16px;
    align-items: flex-start;
  }

  .course-image {
    flex-shrink: 0;
  }

  .thumbnail {
    width: 80px;
    height: 60px;
    border-radius: 6px;
    object-fit: cover;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  .course-details {
    flex: 1;
    min-width: 0;
  }

  .course-title {
    font-size: 16px;
    font-weight: 500;
    color: #333;
    line-height: 1.4;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .course-price {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .price-amount {
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }

  .currency {
    font-size: 12px;
    color: #666;
    margin-top: 2px;
  }

  .course-action {
    display: flex;
    justify-content: center;
  }

  .summary-section {
    padding: 24px;
    border-top: 2px solid #f0f0f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fafafa;
  }

  .summary-row {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .summary-label {
    font-size: 16px;
    color: #666;
    font-weight: 500;
  }

  .summary-value {
    font-size: 20px;
    font-weight: 700;
    color: #333;
  }

  .checkout-btn {
    padding: 12px 32px;
    font-size: 16px;
    font-weight: 600;
    height: auto;
    background: linear-gradient(135deg, #1890ff 0%, #40a9ff 100%);
    border: none;

    &:hover {
      background: linear-gradient(135deg, #40a9ff 0%, #1890ff 100%);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(24, 144, 255, 0.3);
    }
  }

  // Responsive design
  @media (max-width: 768px) {
    .cart-container {
      padding: 16px;
    }

    .table-header,
    .course-item {
      grid-template-columns: 1fr 100px 60px;
      gap: 12px;
      padding: 16px;
    }

    .course-info {
      gap: 12px;
    }

    .thumbnail {
      width: 60px;
      height: 45px;
    }

    .course-title {
      font-size: 14px;
    }

    .summary-section {
      flex-direction: column;
      gap: 16px;
      align-items: stretch;
    }

    .checkout-btn {
      width: 100%;
    }
  }

  @media (max-width: 480px) {
    .section-title {
      font-size: 20px;
    }

    .table-header {
      display: none;
    }

    .course-item {
      display: block;
      padding: 16px;
    }

    .course-info {
      margin-bottom: 12px;
    }

    .course-price {
      text-align: left;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .course-action {
      justify-content: flex-end;
    }
  }
</style>