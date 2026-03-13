-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "isInstructor" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BeltRank" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "colorHex" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BeltRank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exam" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "location" TEXT,
    "beltRankId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Exam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberRankHistory" (
    "id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "beltRankId" TEXT NOT NULL,
    "achievedAt" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,

    CONSTRAINT "MemberRankHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ExamParticipants" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_email_key" ON "Member"("email");

-- CreateIndex
CREATE UNIQUE INDEX "BeltRank_order_key" ON "BeltRank"("order");

-- CreateIndex
CREATE INDEX "MemberRankHistory_memberId_idx" ON "MemberRankHistory"("memberId");

-- CreateIndex
CREATE INDEX "MemberRankHistory_beltRankId_idx" ON "MemberRankHistory"("beltRankId");

-- CreateIndex
CREATE UNIQUE INDEX "_ExamParticipants_AB_unique" ON "_ExamParticipants"("A", "B");

-- CreateIndex
CREATE INDEX "_ExamParticipants_B_index" ON "_ExamParticipants"("B");

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_beltRankId_fkey" FOREIGN KEY ("beltRankId") REFERENCES "BeltRank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberRankHistory" ADD CONSTRAINT "MemberRankHistory_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberRankHistory" ADD CONSTRAINT "MemberRankHistory_beltRankId_fkey" FOREIGN KEY ("beltRankId") REFERENCES "BeltRank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExamParticipants" ADD CONSTRAINT "_ExamParticipants_A_fkey" FOREIGN KEY ("A") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExamParticipants" ADD CONSTRAINT "_ExamParticipants_B_fkey" FOREIGN KEY ("B") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
