export const useFile = () => {
  
  const upload = (file: File) => {
    let formData = new FormData()
    formData.append('file', file)
    fetch('http://localhost:3001', { 
      method: 'POST',
      mode: 'no-cors',
      body: formData,
    })
  }

  return {
    upload
  }
}