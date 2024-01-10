-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "inUse" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "PickUpCar" (
    "id" TEXT NOT NULL,
    "carId" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "initPickUp" TIMESTAMP(3) NOT NULL,
    "endPickUp" TIMESTAMP(3) NOT NULL,
    "deliveryDescription" TEXT,
    "returnedCar" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "PickUpCar_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PickUpCar" ADD CONSTRAINT "PickUpCar_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PickUpCar" ADD CONSTRAINT "PickUpCar_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE CASCADE ON UPDATE CASCADE;
