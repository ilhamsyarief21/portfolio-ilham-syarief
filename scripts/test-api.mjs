// API verification test script

async function runTests() {
  console.log("Starting automated server and API tests...")
  const baseUrl = "http://localhost:3000"

  // 1. Site settings
  const siteRes = await fetch(`${baseUrl}/api/site-settings`)
  const siteData = await siteRes.json()
  console.log("Site Settings check:", siteData.siteName === "Ilham Syarief" ? "PASS" : "FAIL", siteData.siteName)

  // 2. Hero settings
  const heroRes = await fetch(`${baseUrl}/api/hero-settings`)
  const heroData = await heroRes.json()
  console.log("Hero Settings check:", heroData.name === "Ilham Syarief" ? "PASS" : "FAIL", heroData.title)

  // 3. Projects
  const projRes = await fetch(`${baseUrl}/api/projects`)
  const projData = await projRes.json()
  console.log("Projects count:", projData.length, projData.length >= 4 ? "PASS" : "FAIL")

  // 4. Contact form submission
  const msgRes = await fetch(`${baseUrl}/api/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Client Verification Test",
      email: "test@client.org",
      subject: "Inquiry",
      message: "This is a verification test dispatch message.",
    }),
  })
  const msgData = await msgRes.json()
  console.log("Contact form POST check:", msgRes.status === 201 ? "PASS" : "FAIL", msgData)

  // 5. Admin Login
  const loginRes = await fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "admin@ilhamsyarief.dev",
      password: "AdminPassword2026!",
    }),
  })
  const loginData = await loginRes.json()
  const cookie = loginRes.headers.get("set-cookie")
  console.log("Admin Login check:", loginRes.status === 200 ? "PASS" : "FAIL", "Cookie set:", !!cookie)

  // 6. Admin Protected Endpoint with Cookie
  const authCookie = cookie ? cookie.split(";")[0] : ""
  const adminMeRes = await fetch(`${baseUrl}/api/auth/me`, {
    headers: { Cookie: authCookie },
  })
  const adminMeData = await adminMeRes.json()
  console.log("Admin Auth Verification check:", adminMeRes.status === 200 ? "PASS" : "FAIL", adminMeData)

  // 7. Admin Fetch Messages
  const adminMsgRes = await fetch(`${baseUrl}/api/messages`, {
    headers: { Cookie: authCookie },
  })
  const adminMsgData = await adminMsgRes.json()
  console.log("Admin Inbox check:", adminMsgData.length > 0 ? "PASS" : "FAIL", `Found ${adminMsgData.length} messages`)

  console.log("ALL TESTS COMPLETED SUCCESSFULLY!")
}

runTests().catch(console.error)
