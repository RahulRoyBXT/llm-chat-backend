# Define the path to your PDF file
$filePath = "D:\AI\llama-chat-app\test.pdf"
$fileName = [System.IO.Path]::GetFileName($filePath)

# Create a boundary string
$boundary = "----WebKitFormBoundary" + [System.Guid]::NewGuid().ToString("N")

# Read the contents of the file as bytes
$fileBytes = [System.IO.File]::ReadAllBytes($filePath)

# Constructing body with byte array instead of string
$bodyLines = @()
$bodyLines += "--$boundary"
$bodyLines += "Content-Disposition: form-data; name=`"pdf`"; filename=`"$fileName`""
$bodyLines += "Content-Type: application/pdf"
$bodyLines += ""
$bodyLines += [System.Text.Encoding]::GetEncoding("iso-8859-1").GetString($fileBytes) # Using appropriate encoding for binary data
$bodyLines += "--$boundary--"

# Send the request as bytes
$response = Invoke-RestMethod -Uri "http://localhost:5000/upload" -Method Post -ContentType "multipart/form-data; boundary=$boundary" -Body ([System.Text.Encoding]::ASCII.GetBytes($bodyLines -join "`r`n"))

# Output response
$response
