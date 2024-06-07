// Capitalize the first letter of a string
export const capitalizeFirstLetter = (val) => {
  if (!val) return ''
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}

// Phía FE tạo ra hàm generatePlaceholderCard: Khi column rỗng thì không thể kéo card từ column khác vào nên là tạo 1 cái card ảo ở column trống
export const generatePlaceholderCard = (column) => {
  return {
    _id: `${column._id}-placeholder-card`,
    boardId: column.boardId,
    columnId: column._id,
    FE_PlaceholderCard: true
  }
}

export const timeAgo = (timestamp) => {
  const now = new Date()
  const secondsPast = (now.getTime() - timestamp) / 1000

  if (secondsPast < 60) {
    return `${Math.floor(secondsPast)} seconds ago`
  }
  if (secondsPast < 3600) {
    return `${Math.floor(secondsPast / 60)} minutes ago`
  }
  if (secondsPast < 86400) {
    return `${Math.floor(secondsPast / 3600)} hours ago`
  }
  if (secondsPast < 2592000) {
    return `${Math.floor(secondsPast / 86400)} days ago`
  }
  if (secondsPast < 31536000) {
    return `${Math.floor(secondsPast / 2592000)} months ago`
  }
  return `${Math.floor(secondsPast / 31536000)} years ago`
}