# Fullstack Architecture cho Ứng dụng Quản lý Khách sạn

Tài liệu này phân tích và đề xuất cách xây dựng backend trong ứng dụng Next.js hiện tại, tạo ra giải pháp fullstack hoàn chỉnh mà không cần triển khai backend riêng biệt.

## 1. Tổng quan giải pháp

### Kiến trúc đề xuất

```
hotel-management/
├── src/
│   ├── app/             # Pages và route handlers với Next.js App Router
│   │   └── api/         # API Routes 
│   ├── components/      # React components
│   ├── lib/             # Thư viện và utilities
│   │   ├── db/          # Database client và schema
│   │   └── auth/        # Authentication logic
│   ├── models/          # Data models và business logic
│   └── types/           # TypeScript type definitions
```

### Công nghệ đề xuất

1. **Database**: Prisma ORM với PostgreSQL
2. **API**: Next.js API Routes (App Router)
3. **Authentication**: NextAuth.js
4. **State Management**: Kết hợp React Query với Zustand hiện tại
5. **Validation**: Zod

## 2. Database và ORM

### Phân tích và đề xuất

Dựa vào cấu trúc dữ liệu trong `src/types/index.ts` và các yêu cầu nghiệp vụ, ứng dụng khách sạn cần một cơ sở dữ liệu có khả năng:

1. Lưu trữ quan hệ phức tạp (phòng-đặt phòng-khách hàng-hóa đơn)
2. Truy vấn hiệu quả để hiển thị timeline phòng
3. Đảm bảo tính toàn vẹn dữ liệu khi xử lý thanh toán

**Đề xuất:** PostgreSQL + Prisma ORM

PostgreSQL là lựa chọn tốt vì:
- Hỗ trợ tốt các quan hệ phức tạp
- Độ tin cậy cao khi xử lý giao dịch tài chính
- Hỗ trợ JSON cho các dữ liệu linh hoạt (như ghi chú phòng)

Prisma ORM giúp:
- Định nghĩa schema rõ ràng với TypeScript
- Tự động sinh code cho queries an toàn về kiểu dữ liệu
- Migrations quản lý phiên bản database

### Schema Prisma đề xuất

```prisma
// Ví dụ schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Room {
  id              String            @id @default(cuid())
  number          String            @unique
  floor           Int
  type            String
  capacity        Int
  price           Float
  status          String            @default("AVAILABLE") // AVAILABLE, OCCUPIED, MAINTENANCE, CLEANING
  notes           RoomNote[]
  serviceRequests ServiceRequest[]
  bookings        Booking[]
  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt
}

model RoomNote {
  id        String   @id @default(cuid())
  roomId    String
  room      Room     @relation(fields: [roomId], references: [id], onDelete: Cascade)
  content   String
  createdBy String?
  createdAt DateTime @default(now())
}

model ServiceRequest {
  id        String   @id @default(cuid())
  roomId    String
  room      Room     @relation(fields: [roomId], references: [id])
  type      String
  details   String
  status    String   @default("PENDING") // PENDING, IN_PROGRESS, COMPLETED
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Customer {
  id        String    @id @default(cuid())
  name      String
  phone     String?
  email     String?
  idNumber  String?
  address   String?
  bookings  Booking[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model Booking {
  id            String    @id @default(cuid())
  roomId        String
  room          Room      @relation(fields: [roomId], references: [id])
  customerId    String
  customer      Customer  @relation(fields: [customerId], references: [id])
  checkInDate   DateTime
  checkOutDate  DateTime
  actualCheckIn DateTime?
  actualCheckOut DateTime?
  status        String    @default("RESERVED") // RESERVED, CHECKED_IN, CHECKED_OUT, CANCELLED
  price         Float
  bookingType   String    @default("NIGHTLY") // NIGHTLY, HOURLY
  notes         String?
  invoices      Invoice[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Invoice {
  id         String   @id @default(cuid())
  bookingId  String
  booking    Booking  @relation(fields: [bookingId], references: [id])
  amount     Float
  paid       Boolean  @default(false)
  items      Json     // Array of line items
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}

model Partner {
  id        String   @id @default(cuid())
  name      String
  type      String   // TRANSPORTATION, FOOD, LAUNDRY, etc.
  contact   String?
  phone     String?
  email     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Expense {
  id        String   @id @default(cuid())
  amount    Float
  category  String
  details   String?
  date      DateTime @default(now())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Settings {
  id                   String  @id @default("global")
  hotelName            String  @default("Hotel Management")
  standardCheckInTime  String  @default("14:00")
  standardCheckOutTime String  @default("12:00")
  earlyCheckInFee      Float   @default(0)
  lateCheckOutFee      Float   @default(0)
  autoApplyFees        Boolean @default(true)
  logo                 String?
  address              String?
  phone                String?
  email                String?
  updatedAt            DateTime @updatedAt
}

model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  password  String
  role      String   @default("STAFF") // ADMIN, STAFF
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 3. API Routes trong Next.js

Với App Router của Next.js, bạn có thể xây dựng API routes trực tiếp trong cấu trúc thư mục `app/api`. Dưới đây là cấu trúc đề xuất:

```
app/api/
├── auth/
│   └── [...nextauth]/
│       └── route.ts  # Authentication endpoints
├── rooms/
│   ├── route.ts      # GET /api/rooms, POST /api/rooms
│   └── [id]/
│       ├── route.ts  # GET, PUT, DELETE /api/rooms/:id
│       ├── status/
│       │   └── route.ts  # PUT /api/rooms/:id/status
│       ├── notes/
│       │   └── route.ts  # POST /api/rooms/:id/notes
│       └── service-requests/
│           └── route.ts  # POST /api/rooms/:id/service-requests
├── bookings/
│   ├── route.ts
│   └── [id]/
│       ├── route.ts
│       ├── check-in/
│       │   └── route.ts  # PUT /api/bookings/:id/check-in
│       └── check-out/
│           └── route.ts  # PUT /api/bookings/:id/check-out
// ... tương tự cho các endpoints khác
```

### Ví dụ triển khai API Route

```typescript
// app/api/rooms/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const rooms = await prisma.room.findMany({
      include: {
        notes: true,
        serviceRequests: {
          where: { status: { not: 'COMPLETED' } }
        }
      }
    });
    return NextResponse.json(rooms);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch rooms' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const room = await prisma.room.create({ data });
    return NextResponse.json(room, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create room' },
      { status: 500 }
    );
  }
}
```

## 4. Authentication

NextAuth.js là giải pháp tốt nhất cho Next.js, hỗ trợ nhiều provider và dễ tích hợp:

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from '@/lib/db';
import { compare } from 'bcrypt';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !(await compare(credentials.password, user.password))) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        };
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    }
  },
  pages: {
    signIn: '/login',
  }
});

export { handler as GET, handler as POST };
```

## 5. Tích hợp với Frontend

### React Query + Zustand

Kết hợp React Query để quản lý data fetching với Zustand đang dùng để quản lý UI state:

```typescript
// src/lib/api-hooks/useRooms.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/services/api';

export function useRooms() {
  return useQuery({
    queryKey: ['rooms'],
    queryFn: async () => {
      const { data } = await axios.get('/api/rooms');
      return data;
    }
  });
}

export function useUpdateRoomStatus() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ roomId, status }: { roomId: string, status: string }) => {
      const { data } = await axios.put(`/api/rooms/${roomId}/status`, { status });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    }
  });
}
```

### Kết nối với Zustand Store

```typescript
// src/store/index.ts (đã điều chỉnh)
import { create } from 'zustand';
import { useRooms, useUpdateRoomStatus } from '@/lib/api-hooks/useRooms';

export const useAppStore = create((set) => ({
  // ... các state khác ...
  
  // Các hàm helper để kết nối với React Query
  getRooms: () => {
    const { data } = useRooms();
    return data || [];
  },
  
  updateRoomStatus: async (roomId, status) => {
    const mutation = useUpdateRoomStatus();
    await mutation.mutateAsync({ roomId, status });
  },
  
  // ... các actions khác ...
}));
```

## 6. Middleware và Bảo Mật

Triển khai middleware để bảo vệ API routes:

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  
  // Kiểm tra các routes cần bảo vệ
  if (request.nextUrl.pathname.startsWith('/api/') && 
      !request.nextUrl.pathname.startsWith('/api/auth')) {
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }
  
  // Kiểm tra quyền admin cho các routes đặc biệt
  if (request.nextUrl.pathname.startsWith('/api/settings') || 
      request.nextUrl.pathname.startsWith('/api/users')) {
    if (token?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
```

## 7. Migrations và Seed Data

### Khởi tạo Prisma và Database

```bash
# Cài đặt dependencies
npm install prisma @prisma/client
npm install -D typescript ts-node @types/node

# Khởi tạo Prisma
npx prisma init

# Sau khi định nghĩa schema.prisma
npx prisma migrate dev --name init

# Tạo seed data
npx prisma db seed
```

### Tạo seed data

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Tạo admin user
  const adminPassword = await hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@hotel.com' },
    update: {},
    create: {
      email: 'admin@hotel.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
    },
  });
  
  // Tạo dữ liệu mẫu cho phòng
  const roomTypes = ['Standard', 'Deluxe', 'Suite'];
  const floors = [1, 2, 3];
  
  for (const floor of floors) {
    for (let i = 1; i <= 10; i++) {
      const roomNumber = `${floor}${i.toString().padStart(2, '0')}`;
      const type = roomTypes[Math.floor(Math.random() * roomTypes.length)];
      const capacity = type === 'Standard' ? 2 : type === 'Deluxe' ? 3 : 4;
      const price = type === 'Standard' ? 50 : type === 'Deluxe' ? 80 : 120;
      
      await prisma.room.upsert({
        where: { number: roomNumber },
        update: {},
        create: {
          number: roomNumber,
          floor,
          type,
          capacity,
          price,
          status: 'AVAILABLE',
        },
      });
    }
  }
  
  // Thiết lập cài đặt mặc định
  await prisma.settings.upsert({
    where: { id: 'global' },
    update: {},
    create: {
      hotelName: 'Hotel Management System',
      standardCheckInTime: '14:00',
      standardCheckOutTime: '12:00',
      earlyCheckInFee: 10,
      lateCheckOutFee: 10,
      autoApplyFees: true,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
```

## 8. Triển khai Docker

Để đơn giản hóa quá trình phát triển và triển khai, hãy xem xét sử dụng Docker:

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

```yaml
# docker-compose.yml
version: '3'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/hotel
      - NEXTAUTH_SECRET=your_secret_here
      - NEXTAUTH_URL=http://localhost:3000
    depends_on:
      - db
  
  db:
    image: postgres:15
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=hotel
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

## 9. Kết luận và Bước tiếp theo

### Ưu điểm của giải pháp fullstack với Next.js:

1. **Đơn giản hóa stack công nghệ**: Không cần triển khai backend riêng biệt
2. **TypeScript end-to-end**: Types được chia sẻ giữa frontend và backend
3. **Hiệu quả phát triển**: API routes và pages cùng trong một repository
4. **Dễ triển khai**: Chỉ cần triển khai một ứng dụng duy nhất

### Các bước triển khai tiếp theo:

1. Thiết lập Prisma và database PostgreSQL
2. Tạo API routes theo cấu trúc đã đề xuất
3. Kết nối frontend với API routes thay vì mock data
4. Thiết lập authentication với NextAuth.js
5. Dần dần mở rộng chức năng theo lộ trình phát triển

### Lưu ý về hiệu năng:

- Sử dụng React Query để tối ưu việc fetch và cache data
- Xem xét triển khai Incremental Static Regeneration (ISR) cho các trang ít thay đổi
- Đảm bảo có error boundary và loading states để UX tốt
- Sử dụng transaction khi thực hiện các thao tác quan trọng như thanh toán

Giải pháp này sẽ giúp bạn tạo ra một ứng dụng quản lý khách sạn fullstack với Next.js, tận dụng tối đa khả năng của framework để xử lý cả frontend và backend trong cùng một dự án.
