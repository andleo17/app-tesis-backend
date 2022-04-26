-- CreateTable
CREATE TABLE "QuestionCategory" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "QuestionCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "label" VARCHAR(20) NOT NULL,
    "content" TEXT NOT NULL,
    "questionCategoryId" INTEGER NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("label")
);

-- CreateTable
CREATE TABLE "QuestionOption" (
    "position" INTEGER NOT NULL,
    "questionLabel" VARCHAR(20) NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "QuestionOption_pkey" PRIMARY KEY ("questionLabel","position")
);

-- CreateTable
CREATE TABLE "Component" (
    "id" SERIAL NOT NULL,
    "frabricId" TEXT NOT NULL,
    "deltronId" TEXT,
    "image" TEXT,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "suggestedPrice" INTEGER NOT NULL,
    "rgb" BOOLEAN,

    CONSTRAINT "Component_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cpu" (
    "id" INTEGER NOT NULL,
    "componentId" INTEGER NOT NULL,
    "family" TEXT NOT NULL,
    "generation" INTEGER,
    "platform" TEXT NOT NULL,
    "specifier" TEXT NOT NULL,
    "launchDate" TIMESTAMP(3),
    "baseFrecuency" DOUBLE PRECISION NOT NULL,
    "turboFrecuency" DOUBLE PRECISION NOT NULL,
    "cores" INTEGER NOT NULL,
    "threads" INTEGER NOT NULL,
    "cacheL2" INTEGER,
    "cacheL3" INTEGER NOT NULL,
    "tdp" INTEGER NOT NULL,
    "lithography" TEXT NOT NULL,
    "socket" TEXT NOT NULL,
    "maxTemperature" INTEGER NOT NULL,
    "admitedMemory" TEXT[],
    "maxMemory" INTEGER NOT NULL,
    "maxMemorySpeed" INTEGER NOT NULL,
    "haveIntegratedGraphics" BOOLEAN NOT NULL,
    "graphicBaseFrecuency" DOUBLE PRECISION,
    "graphicMaxFrecuency" DOUBLE PRECISION,
    "graphicMaxResolution" TEXT,

    CONSTRAINT "Cpu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ram" (
    "id" INTEGER NOT NULL,
    "componentId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "voltage" DOUBLE PRECISION NOT NULL,
    "frequency" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,
    "format" TEXT NOT NULL,
    "casLatency" INTEGER NOT NULL,
    "latency" INTEGER NOT NULL,

    CONSTRAINT "Ram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Motherboard" (
    "id" INTEGER NOT NULL,
    "componentId" INTEGER NOT NULL,
    "socket" TEXT NOT NULL,
    "chipset" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "supportedMemory" TEXT[],
    "memoryType" TEXT NOT NULL,
    "memorySlots" INTEGER NOT NULL,
    "memoryChannel" INTEGER NOT NULL,
    "networkInterfaceSpeed" TEXT NOT NULL,
    "powerSupply" TEXT NOT NULL,
    "portsATA" INTEGER NOT NULL,
    "portsPCIe" INTEGER NOT NULL,
    "portsUSB" INTEGER NOT NULL,
    "format" TEXT NOT NULL,

    CONSTRAINT "Motherboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gpu" (
    "id" SERIAL NOT NULL,
    "componentId" INTEGER NOT NULL,
    "family" TEXT NOT NULL,
    "cores" INTEGER NOT NULL,
    "memory" INTEGER NOT NULL,
    "frecuency" DOUBLE PRECISION NOT NULL,
    "maxResolution" TEXT NOT NULL,
    "interface" TEXT NOT NULL,
    "power" INTEGER NOT NULL,
    "connectorHDMI" INTEGER NOT NULL,
    "connectorDisplayPort" INTEGER NOT NULL,
    "pines" INTEGER NOT NULL,

    CONSTRAINT "Gpu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PowerSupply" (
    "id" INTEGER NOT NULL,
    "componentId" INTEGER NOT NULL,
    "potency" INTEGER NOT NULL,
    "efficiency" TEXT NOT NULL,
    "isModular" BOOLEAN NOT NULL,
    "inVoltage" INTEGER NOT NULL,
    "frequency" INTEGER NOT NULL,
    "format" TEXT NOT NULL,
    "outVoltage" INTEGER NOT NULL,
    "connectorsATX" INTEGER NOT NULL,
    "connectorsSATA" INTEGER NOT NULL,
    "connectorsPCIe" INTEGER NOT NULL,
    "connectorsEPS" INTEGER NOT NULL,

    CONSTRAINT "PowerSupply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Storage" (
    "id" SERIAL NOT NULL,
    "componentId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "revolutions" INTEGER,
    "cache" INTEGER,
    "format" TEXT NOT NULL,
    "interface" TEXT NOT NULL,
    "haveSink" BOOLEAN NOT NULL,
    "speedRead" INTEGER NOT NULL,
    "speedWrite" INTEGER NOT NULL,

    CONSTRAINT "Storage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Component_frabricId_key" ON "Component"("frabricId");

-- CreateIndex
CREATE UNIQUE INDEX "Component_deltronId_key" ON "Component"("deltronId");

-- CreateIndex
CREATE UNIQUE INDEX "Cpu_componentId_key" ON "Cpu"("componentId");

-- CreateIndex
CREATE UNIQUE INDEX "Ram_componentId_key" ON "Ram"("componentId");

-- CreateIndex
CREATE UNIQUE INDEX "Motherboard_componentId_key" ON "Motherboard"("componentId");

-- CreateIndex
CREATE UNIQUE INDEX "Gpu_componentId_key" ON "Gpu"("componentId");

-- CreateIndex
CREATE UNIQUE INDEX "PowerSupply_componentId_key" ON "PowerSupply"("componentId");

-- CreateIndex
CREATE UNIQUE INDEX "Storage_componentId_key" ON "Storage"("componentId");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_questionCategoryId_fkey" FOREIGN KEY ("questionCategoryId") REFERENCES "QuestionCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionOption" ADD CONSTRAINT "QuestionOption_questionLabel_fkey" FOREIGN KEY ("questionLabel") REFERENCES "Question"("label") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cpu" ADD CONSTRAINT "Cpu_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ram" ADD CONSTRAINT "Ram_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Motherboard" ADD CONSTRAINT "Motherboard_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gpu" ADD CONSTRAINT "Gpu_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PowerSupply" ADD CONSTRAINT "PowerSupply_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Storage" ADD CONSTRAINT "Storage_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
