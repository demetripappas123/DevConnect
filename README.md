# DevConnect

A developer community platform built with Next.js, Supabase, and Prisma.

## Security Best Practices

1. **Environment Variables**
   - Never commit `.env` or `.env.local` files
   - Use `.env.example` as a template
   - Keep sensitive keys secure
   - Rotate keys regularly

2. **Database Security**
   - Use connection pooling
   - Implement row-level security (RLS) in Supabase
   - Use parameterized queries
   - Implement proper access controls

3. **Authentication**
   - Use secure session management
   - Implement proper password hashing
   - Use HTTPS only
   - Implement rate limiting

## Getting Started

1. Clone the repository
2. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
3. Fill in your environment variables in `.env.local`
4. Install dependencies:
   ```bash
   npm install
   ```
5. Set up the database:
   ```bash
   npm run prisma:generate
   npm run prisma:push
   ```
6. Run the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Required environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `DATABASE_URL`: Your Supabase PostgreSQL connection string
- `DIRECT_URL`: Your Supabase direct connection string
- `NEXTAUTH_URL`: Your application URL
- `NEXTAUTH_SECRET`: Your NextAuth secret key

## Security Checklist

- [ ] Environment variables are properly set
- [ ] Database RLS policies are configured
- [ ] Authentication is properly implemented
- [ ] API routes are protected
- [ ] Input validation is in place
- [ ] CORS is properly configured
- [ ] Rate limiting is implemented
- [ ] Error handling is secure
- [ ] Dependencies are up to date
- [ ] Security headers are configured