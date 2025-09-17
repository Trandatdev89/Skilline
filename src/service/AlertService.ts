import { ElNotification } from 'element-plus'

const timeDuration = 3000
const AlertService = () => {
  return {
    success: (title: string, message: string) => {
      ElNotification.success({
        title: title,
        message: message,
        type: 'success',
        duration: timeDuration
      })
    },
    error: (title: string, message: string) => {
      ElNotification.error({
        title: title,
        message: message,
        type: 'error',
        duration: timeDuration
      })
    },
    warning: (title: string, message: string) => {
      ElNotification.warning({
        title: title,
        message: message,
        type: 'warning',
        duration: timeDuration
      })
    }
  }
}

export default AlertService();