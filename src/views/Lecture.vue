<template>
  <div class="course">
    <div class="container">
      <div class="course-lecture">
        <div class="lecture-content">
          <!-- Title -->
          <h2 class="course-title">Nội dung khóa học</h2>

          <!-- Lesson Section -->
          <div class="lesson-section">
            <div class="section-header">
              <h3>PHẦN 1: KIỂU DỮ LIỆU, BIẾN, VÒNG LẶP, HÀM</h3>
            </div>

            <div class="lesson-list">
              <div
                  v-for="lesson in lessons"
                  :key="lesson.id"
                  class="lesson-item"
                  :class="{ 'premium': lesson.isPremium }"
              >
                <div class="lesson-main">
                  <el-icon class="play-icon">
                    <VideoPlay />
                  </el-icon>
                  <span class="lesson-title">{{ lesson.title }}</span>
                </div>
                <div class="lesson-actions">
                  <el-link
                      v-if="!lesson.isPremium"
                      type="primary"
                      class="try-link"
                  >
                    Học thử
                  </el-link>
                  <span class="lesson-duration">{{ lesson.duration }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Course Info Sidebar -->
        <div class="course-sidebar">
          <!-- Video Preview -->
          <div class="video-preview">
            <div class="video-container">
              <div class="video-placeholder">
                <div class="video-content">
                  <div class="course-badge">KHÓA HỌC LẬP TRÌNH C</div>
                  <div class="video-stats">
                    <span>QUA 130 VIDEO</span>
                    <span>VÀ 310 BÀI TẬP</span>
                    <span>HACKERRANK</span>
                  </div>
                  <div class="instructor-info">
                    <div class="instructor-avatar"></div>
                    <span>28+ HƯỚNG DẪN CÀI ĐẶT DEV C++ ĐỂ LẬP TRÌNH</span>
                  </div>
                  <el-button class="watch-btn">
                    <el-icon>
                      <VideoPlay />
                    </el-icon>
                    WATCH VIDEO
                  </el-button>
                </div>
                <div class="play-button">
                  <el-icon>
                    <VideoPlay />
                  </el-icon>
                </div>
              </div>
              <!-- Social Media Icons -->
              <div class="social-icons">
                <div class="social-icon youtube"></div>
                <div class="social-icon facebook"></div>
              </div>
            </div>
          </div>

          <!-- Pricing -->
          <div class="pricing-section">
            <div class="price-display">
              <span class="current-price">1,099,000</span>
              <span class="currency">VND</span>
              <span class="original-price">2,750,000 VND</span>
            </div>

            <el-button type="primary" size="large" class="register-btn">
              Đăng Ký Học
            </el-button>
          </div>

          <!-- Course Stats -->
          <div class="course-stats">
            <div class="stat-item">
              <el-icon>
                <Document />
              </el-icon>
              <div class="stat-content">
                <span class="stat-label">Bài giảng</span>
                <span class="stat-value">170</span>
              </div>
            </div>

            <div class="stat-item">
              <el-icon>
                <Clock />
              </el-icon>
              <div class="stat-content">
                <span class="stat-label">Thời lượng</span>
                <span class="stat-value">150 giờ</span>
              </div>
            </div>

            <div class="stat-item">
              <el-icon>
                <EditPen />
              </el-icon>
              <div class="stat-content">
                <span class="stat-label">Bài tập</span>
                <span class="stat-value">520</span>
              </div>
            </div>

            <div class="stat-item">
              <el-icon>
                <Trophy />
              </el-icon>
              <div class="stat-content">
                <span class="stat-label">Số hữu</span>
                <span class="stat-value">Trọn đời</span>
              </div>
            </div>
          </div>

          <!-- Social Share -->
          <div class="social-share">
            <div class="social-item facebook">
              <el-icon>
                <Share />
              </el-icon>
            </div>
            <div class="social-item twitter">
              <el-icon>
                <Share />
              </el-icon>
            </div>
            <div class="social-item pinterest">
              <el-icon>
                <Share />
              </el-icon>
            </div>
            <div class="social-item linkedin">
              <el-icon>
                <Share />
              </el-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import {
    VideoPlay,
    Document,
    Clock,
    EditPen,
    Trophy,
    Share
  } from '@element-plus/icons-vue'

  const lessons = ref([
    {
      id: 1,
      title: 'Bài 1. Hướng dẫn cài đặt phần mềm DEV C++ để lập trình',
      duration: '03:01',
      isPremium: false
    },
    {
      id: 2,
      title: 'Bài 2. Hướng dẫn sử dụng Dev C và lập trình chương trình đầu tiên',
      duration: '12:14',
      isPremium: false
    },
    {
      id: 3,
      title: 'Bài 3. Kiểu dữ liệu và Biến',
      duration: '28:34',
      isPremium: false
    },
    {
      id: 4,
      title: 'Bài 4. Chú thích trong ngôn ngữ lập trình C',
      duration: '07:27',
      isPremium: false
    },
    {
      id: 5,
      title: 'Bài 5. Nhập xuất dữ liệu với hàm printf và hàm scanf',
      duration: '26:25',
      isPremium: false
    },
    {
      id: 6,
      title: 'Bài 6. Toán tử gán và toán tử toán học',
      duration: '25:01',
      isPremium: true
    },
    {
      id: 7,
      title: 'Bài 7. Toán tử so sánh và toán tử logic',
      duration: '18:07',
      isPremium: true
    },
    {
      id: 8,
      title: 'Bài 8. Toán tử tăng giảm và toán tử 3 ngôi',
      duration: '11:53',
      isPremium: true
    },
    {
      id: 9,
      title: 'Bài 9. Các hàm toán học phổ biến trong thư viện math.h',
      duration: '18:27',
      isPremium: true
    },
    {
      id: 10,
      title: 'Bài 10. Hướng dẫn làm bài và nộp bài trên trang Hackerrank',
      duration: '24:19',
      isPremium: false
    },
    {
      id: 11,
      title: 'Bài 11. Hướng dẫn giải Contest 1 từ bài 1 tới bài 5',
      duration: '19:36',
      isPremium: true
    },
    {
      id: 12,
      title: 'Bài 12. Cấu trúc rẽ nhánh If...else',
      duration: '24:43',
      isPremium: true
    },
    {
      id: 13,
      title: 'Bài 13. Hướng dẫn giải Contest 1 từ bài 6 tới bài 10',
      duration: '26:50',
      isPremium: true
    }
  ])
</script>

<style lang="scss" scoped>
  .course-lecture {
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: 30px;
    padding: 20px;
    background-color: #f8f9fa;
    min-height: 100vh;

    .lecture-content {
      background: white;
      border-radius: 12px;
      padding: 30px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

      .course-title {
        color: #2c5aa0;
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 30px;
        margin-top: 0;
      }

      .lesson-section {
        .section-header {
          background: #17a2b8;
          color: white;
          padding: 15px 20px;
          margin-bottom: 0;
          border-radius: 8px;

          h3 {
            margin: 0;
            font-size: 16px;
            font-weight: 600;
          }
        }

        .lesson-list {
          background: white;
          border: 1px solid #e9ecef;
          border-top: none;
          border-radius: 0 0 8px 8px;

          .lesson-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 20px;
            border-bottom: 1px solid #f1f3f4;
            transition: all 0.3s ease;

            &:hover {
              background-color: #f8f9fa;
            }

            &:last-child {
              border-bottom: none;
            }

            &.premium {
              .lesson-title {
                color: #6c757d;
              }
            }

            .lesson-main {
              display: flex;
              align-items: center;
              flex: 1;

              .play-icon {
                color: #17a2b8;
                margin-right: 15px;
                font-size: 16px;
              }

              .lesson-title {
                color: #333;
                font-size: 15px;
                line-height: 1.4;
              }
            }

            .lesson-actions {
              display: flex;
              align-items: center;
              gap: 15px;

              .try-link {
                font-size: 14px;
                text-decoration: none;

                &:hover {
                  text-decoration: underline;
                }
              }

              .lesson-duration {
                color: #17a2b8;
                font-size: 14px;
                font-weight: 500;
                min-width: 50px;
                text-align: right;
              }
            }
          }
        }
      }
    }

    .course-sidebar {
      display: flex;
      flex-direction: column;
      gap: 20px;

      .video-preview {
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

        .video-container {
          position: relative;

          .video-placeholder {
            aspect-ratio: 16/9;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            padding: 20px;

            .video-content {
              text-align: center;
              z-index: 2;

              .course-badge {
                background: rgba(255, 255, 255, 0.2);
                padding: 8px 16px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: bold;
                margin-bottom: 15px;
              }

              .video-stats {
                display: flex;
                flex-direction: column;
                gap: 5px;
                margin-bottom: 15px;

                span {
                  font-size: 14px;
                  font-weight: 600;
                }
              }

              .instructor-info {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 20px;
                font-size: 10px;

                .instructor-avatar {
                  width: 30px;
                  height: 30px;
                  background: rgba(255, 255, 255, 0.3);
                  border-radius: 50%;
                }
              }

              .watch-btn {
                background: #17a2b8;
                border: none;
                padding: 10px 20px;
                border-radius: 8px;
                font-weight: bold;

                &:hover {
                  background: #138496;
                }
              }
            }

            .play-button {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 60px;
              height: 60px;
              background: rgba(255, 255, 255, 0.9);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              transition: all 0.3s ease;

              &:hover {
                background: white;
                transform: translate(-50%, -50%) scale(1.1);
              }

              .el-icon {
                font-size: 24px;
                color: #17a2b8;
              }
            }
          }

          .social-icons {
            position: absolute;
            bottom: 10px;
            right: 10px;
            display: flex;
            gap: 8px;

            .social-icon {
              width: 25px;
              height: 25px;
              border-radius: 4px;
              cursor: pointer;

              &.youtube {
                background: #ff0000;
              }

              &.facebook {
                background: #1877f2;
              }
            }
          }
        }
      }

      .pricing-section {
        background: white;
        padding: 25px;
        border-radius: 12px;
        text-align: center;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

        .price-display {
          margin-bottom: 20px;

          .current-price {
            font-size: 28px;
            font-weight: bold;
            color: #e74c3c;
          }

          .currency {
            font-size: 18px;
            color: #e74c3c;
            margin-left: 5px;
          }

          .original-price {
            display: block;
            font-size: 16px;
            color: #999;
            text-decoration: line-through;
            margin-top: 5px;
          }
        }

        .register-btn {
          width: 100%;
          background: #17a2b8;
          border: none;
          padding: 15px;
          font-size: 16px;
          font-weight: bold;
          border-radius: 8px;

          &:hover {
            background: #138496;
          }
        }
      }

      .course-stats {
        background: white;
        padding: 25px;
        border-radius: 12px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

        .stat-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 12px 0;
          border-bottom: 1px solid #f1f3f4;

          &:last-child {
            border-bottom: none;
          }

          .el-icon {
            color: #17a2b8;
            font-size: 20px;
          }

          .stat-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;

            .stat-label {
              color: #666;
              font-size: 14px;
            }

            .stat-value {
              color: #333;
              font-weight: 600;
              font-size: 14px;
            }
          }
        }
      }

      .social-share {
        display: flex;
        justify-content: center;
        gap: 15px;

        .social-item {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;

          .el-icon {
            color: white;
            font-size: 18px;
          }

          &.facebook {
            background: #1877f2;

            &:hover {
              background: #166fe5;
            }
          }

          &.twitter {
            background: #1da1f2;

            &:hover {
              background: #1a94da;
            }
          }

          &.pinterest {
            background: #bd081c;

            &:hover {
              background: #a70719;
            }
          }

          &.linkedin {
            background: #0077b5;

            &:hover {
              background: #006ba1;
            }
          }
        }
      }
    }
  }

  @media (max-width: 1024px) {
    .course-lecture {
      grid-template-columns: 1fr;
      gap: 20px;

      .course-sidebar {
        order: -1;

        .video-preview,
        .pricing-section,
        .course-stats {
          margin-bottom: 0;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .course-lecture {
      padding: 15px;

      .lecture-content {
        padding: 20px;
      }

      .course-sidebar {
        .pricing-section,
        .course-stats {
          padding: 20px;
        }
      }
    }
  }
</style>