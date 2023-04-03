-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "codigo" TEXT,
    "is_admin" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ponto" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "entry" TIMESTAMP(3) NOT NULL,
    "exit" TIMESTAMP(3),

    CONSTRAINT "Ponto_pkey" PRIMARY KEY ("id")
);
