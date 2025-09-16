import nodemailer from 'nodemailer'

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || 'info@b4uesports.com',
    pass: process.env.SMTP_PASSWORD || 'your-app-password'
  }
})

export interface EmailNotification {
  to: string
  subject: string
  html: string
  cc?: string
  bcc?: string
}

export async function sendEmail(notification: EmailNotification) {
  try {
    const info = await transporter.sendMail({
      from: `"B4U Esports Marketplace" <${process.env.SMTP_USER || 'info@b4uesports.com'}>`,
      to: notification.to,
      cc: notification.cc,
      bcc: notification.bcc,
      subject: notification.subject,
      html: notification.html
    })

    console.log('Email sent successfully:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error: any) {
    console.error('Email sending failed:', error)
    return { success: false, error: error?.message || 'Unknown error' }
  }
}

// Email templates
export function createOrderConfirmationEmail(order: any, user: any) {
  const gameType = order.package.game === 'PUBG_MOBILE' ? 'PUBG Mobile' : 'Mobile Legends'
  const currency = order.package.game === 'PUBG_MOBILE' ? 'UC' : 'Diamonds'
  
  return {
    to: user.email,
    cc: 'admin@b4uesports.com',
    subject: `Order Confirmation - ${order.package.name} | B4U Esports`,
    html: `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Order Confirmation</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
            .header { background: linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%); color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .order-details { background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0; }
            .status-badge { display: inline-block; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: bold; }
            .status-pending { background: #fef3cd; color: #856404; }
            .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; }
            .logo { width: 60px; height: 60px; border-radius: 8px; }
        </style>
    </head>
    <body>
        <div class="header">
            <img src="https://b4uesports.com/wp-content/uploads/2025/04/cropped-Black_and_Blue_Simple_Creative_Illustrative_Dragons_E-Sport_Logo_20240720_103229_0000-removebg-preview.png" 
                 alt="B4U Esports" class="logo">
            <h1>Order Confirmation</h1>
            <p>Thank you for your purchase!</p>
        </div>
        
        <div class="content">
            <h2>Hello ${user.piUsername}!</h2>
            <p>Your order has been successfully placed and is being processed.</p>
            
            <div class="order-details">
                <h3>Order Details</h3>
                <p><strong>Order ID:</strong> ${order.id}</p>
                <p><strong>Game:</strong> ${gameType}</p>
                <p><strong>Package:</strong> ${order.package.name}</p>
                <p><strong>Amount:</strong> ${order.package.amount.toLocaleString()} ${currency}</p>
                <p><strong>Pi Amount:</strong> ${order.piAmount.toFixed(4)} Pi</p>
                <p><strong>USD Value:</strong> $${order.usdtAmount.toFixed(2)}</p>
                <p><strong>Status:</strong> <span class="status-badge status-pending">PENDING</span></p>
                <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
            </div>
            
            <div class="order-details">
                <h3>Delivery Information</h3>
                ${order.package.game === 'PUBG_MOBILE' ? `
                    <p><strong>PUBG Mobile IGN:</strong> ${user.pubgProfile?.ign || 'Not provided'}</p>
                    <p><strong>PUBG Mobile UID:</strong> ${order.gameUserId}</p>
                ` : `
                    <p><strong>Mobile Legends User ID:</strong> ${order.gameUserId}</p>
                    <p><strong>Zone ID:</strong> ${order.gameZoneId}</p>
                `}
            </div>
            
            <div style="background: #e7f3ff; border: 1px solid #b3d9ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p><strong>🔔 What's Next?</strong></p>
                <ul>
                    <li>Your Pi payment is being processed</li>
                    <li>Once confirmed, we'll deliver your ${currency} within 24 hours</li>
                    <li>You'll receive an email confirmation when delivery is complete</li>
                    <li>Track your order status in your dashboard</li>
                </ul>
            </div>
            
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p><strong>⚠️ Testnet Notice:</strong> This transaction uses Pi testnet for testing purposes. 
                No real Pi coins will be deducted from your mainnet wallet.</p>
            </div>
            
            <p>If you have any questions, please contact our support team:</p>
            <p>📧 Email: info@b4uesports.com<br>
               📱 Phone: +97517875099</p>
        </div>
        
        <div class="footer">
            <p>Thank you for choosing B4U Esports!</p>
            <p>Visit us: <a href="https://b4uesports.com">b4uesports.com</a></p>
            <p>Follow us on: 
               <a href="https://www.facebook.com/b4uesports">Facebook</a> | 
               <a href="https://youtube.com/@b4uesports">YouTube</a> | 
               <a href="https://www.instagram.com/b4uesports">Instagram</a>
            </p>
        </div>
    </body>
    </html>
    `
  }
}

export function createOrderCompletionEmail(order: any, user: any) {
  const gameType = order.package.game === 'PUBG_MOBILE' ? 'PUBG Mobile' : 'Mobile Legends'
  const currency = order.package.game === 'PUBG_MOBILE' ? 'UC' : 'Diamonds'
  
  return {
    to: user.email,
    subject: `Order Completed - ${order.package.name} Delivered! | B4U Esports`,
    html: `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Order Completed</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
            .header { background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .order-details { background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0; }
            .status-badge { display: inline-block; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: bold; }
            .status-completed { background: #d1e7dd; color: #0f5132; }
            .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; }
            .logo { width: 60px; height: 60px; border-radius: 8px; }
            .success-icon { font-size: 48px; text-align: center; margin: 20px 0; }
        </style>
    </head>
    <body>
        <div class="header">
            <img src="https://b4uesports.com/wp-content/uploads/2025/04/cropped-Black_and_Blue_Simple_Creative_Illustrative_Dragons_E-Sport_Logo_20240720_103229_0000-removebg-preview.png" 
                 alt="B4U Esports" class="logo">
            <h1>Order Completed!</h1>
            <div class="success-icon">✅</div>
            <p>Your ${currency} has been delivered successfully!</p>
        </div>
        
        <div class="content">
            <h2>Great news, ${user.piUsername}!</h2>
            <p>Your order has been completed and your ${currency} has been delivered to your ${gameType} account.</p>
            
            <div class="order-details">
                <h3>Delivery Confirmation</h3>
                <p><strong>Order ID:</strong> ${order.id}</p>
                <p><strong>Game:</strong> ${gameType}</p>
                <p><strong>Package:</strong> ${order.package.name}</p>
                <p><strong>Amount Delivered:</strong> ${order.package.amount.toLocaleString()} ${currency}</p>
                <p><strong>Status:</strong> <span class="status-badge status-completed">COMPLETED</span></p>
                <p><strong>Completed Date:</strong> ${new Date(order.completedAt || order.updatedAt).toLocaleString()}</p>
            </div>
            
            <div style="background: #d1e7dd; border: 1px solid #a3cfbb; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p><strong>🎮 Check Your Game:</strong></p>
                <p>Please check your ${gameType} account to confirm receipt of your ${currency}. 
                The ${currency} should appear in your account within a few minutes.</p>
                
                ${order.package.game === 'PUBG_MOBILE' ? `
                    <p><strong>Delivered to:</strong> ${user.pubgProfile?.ign || 'Unknown'} (UID: ${order.gameUserId})</p>
                ` : `
                    <p><strong>Delivered to:</strong> User ID ${order.gameUserId} (Zone: ${order.gameZoneId})</p>
                `}
            </div>
            
            <div style="background: #e7f3ff; border: 1px solid #b3d9ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p><strong>💎 Enjoy Your Purchase!</strong></p>
                <p>Your ${currency} is ready to use! Enjoy your enhanced gaming experience with your new in-game currency.</p>
            </div>
            
            <p>Thank you for trusting B4U Esports for your gaming needs!</p>
            
            <p>If you have any issues or questions, please contact our support team:</p>
            <p>📧 Email: info@b4uesports.com<br>
               📱 Phone: +97517875099</p>
        </div>
        
        <div class="footer">
            <p>Thank you for choosing B4U Esports!</p>
            <p>Rate your experience and leave a review!</p>
            <p>Visit us: <a href="https://b4uesports.com">b4uesports.com</a></p>
            <p>Follow us on: 
               <a href="https://www.facebook.com/b4uesports">Facebook</a> | 
               <a href="https://youtube.com/@b4uesports">YouTube</a> | 
               <a href="https://www.instagram.com/b4uesports">Instagram</a>
            </p>
        </div>
    </body>
    </html>
    `
  }
}

export function createAdminOrderNotificationEmail(order: any, user: any) {
  const gameType = order.package.game === 'PUBG_MOBILE' ? 'PUBG Mobile' : 'Mobile Legends'
  const currency = order.package.game === 'PUBG_MOBILE' ? 'UC' : 'Diamonds'
  
  return {
    to: 'admin@b4uesports.com',
    subject: `🚨 New Order Alert - ${order.package.name} | B4U Esports Admin`,
    html: `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>New Order Alert</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
            .header { background: linear-gradient(135deg, #dc2626 0%, #f59e0b 100%); color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .order-details { background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0; }
            .user-details { background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; }
            .status-badge { display: inline-block; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: bold; }
            .status-pending { background: #fef3cd; color: #856404; }
            .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; }
            .logo { width: 60px; height: 60px; border-radius: 8px; }
            .alert-icon { font-size: 48px; text-align: center; margin: 20px 0; }
            .action-button { display: inline-block; background: #2563eb; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; margin: 10px 5px; }
        </style>
    </head>
    <body>
        <div class="header">
            <img src="https://b4uesports.com/wp-content/uploads/2025/04/cropped-Black_and_Blue_Simple_Creative_Illustrative_Dragons_E-Sport_Logo_20240720_103229_0000-removebg-preview.png" 
                 alt="B4U Esports" class="logo">
            <h1>🚨 NEW ORDER ALERT</h1>
            <div class="alert-icon">📋</div>
            <p>A new order requires your attention!</p>
        </div>
        
        <div class="content">
            <h2>Order Details</h2>
            
            <div class="order-details">
                <h3>📦 Package Information</h3>
                <p><strong>Order ID:</strong> ${order.id}</p>
                <p><strong>Game:</strong> ${gameType}</p>
                <p><strong>Package:</strong> ${order.package.name}</p>
                <p><strong>Amount:</strong> ${order.package.amount.toLocaleString()} ${currency}</p>
                <p><strong>Pi Amount:</strong> ${order.piAmount.toFixed(4)} Pi</p>
                <p><strong>USD Value:</strong> $${order.usdtAmount.toFixed(2)}</p>
                <p><strong>Status:</strong> <span class="status-badge status-pending">PENDING</span></p>
                <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
                <p><strong>Pi Transaction ID:</strong> ${order.piTransactionId || 'Pending'}</p>
            </div>
            
            <div class="user-details">
                <h3>👤 Customer Information</h3>
                <p><strong>Username:</strong> ${user.piUsername}</p>
                <p><strong>Email:</strong> ${user.email || 'Not provided'}</p>
                <p><strong>Country:</strong> ${user.country || 'Not provided'}</p>
                <p><strong>Pi Wallet:</strong> ${user.piWalletAddress}</p>
                
                <h4>🎮 Game Account Details</h4>
                ${order.package.game === 'PUBG_MOBILE' ? `
                    <p><strong>PUBG Mobile IGN:</strong> ${user.pubgProfile?.ign || 'Not provided'}</p>
                    <p><strong>PUBG Mobile UID:</strong> ${order.gameUserId}</p>
                ` : `
                    <p><strong>Mobile Legends User ID:</strong> ${order.gameUserId}</p>
                    <p><strong>Zone ID:</strong> ${order.gameZoneId}</p>
                `}
            </div>
            
            <div style="background: #fee2e2; border: 1px solid #fca5a5; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p><strong>⚡ Action Required:</strong></p>
                <ul>
                    <li>Verify Pi payment status</li>
                    <li>Process ${currency} delivery</li>
                    <li>Update order status</li>
                    <li>Monitor for completion</li>
                </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3002'}/admin" class="action-button">
                    🔧 Manage in Admin Panel
                </a>
                <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3002'}/admin?tab=transactions" class="action-button">
                    📊 View All Transactions
                </a>
            </div>
            
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p><strong>⚠️ Testnet Notice:</strong> This is a testnet transaction for testing purposes.</p>
            </div>
        </div>
        
        <div class="footer">
            <p>B4U Esports Admin Notification System</p>
            <p>This email was automatically generated when a new order was placed.</p>
            <p>Timestamp: ${new Date().toLocaleString()}</p>
        </div>
    </body>
    </html>
    `
  }
}