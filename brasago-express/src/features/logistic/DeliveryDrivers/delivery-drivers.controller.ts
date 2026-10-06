import { Request, Response } from "express";
import { BaseController } from "../../../shared/http/base-controller";
import { CreateDeliveryDriverDto, PatchDeliveryDriverDto, UpdateDeliveryDriverDto } from "./dto";
import { DeliveryDriversService } from "./delivery-drivers.service";

/**
 * Capa Controller del feature DeliveryDrivers.
 *
 * Traduce HTTP <-> negocio: lee `req`, llama al service y arma la respuesta.
 * No contiene reglas de negocio ni consultas a Sequelize.
 *
 * Cada método delega el manejo de errores en `run()` (ver `BaseController`):
 * así el `try/catch` no se repite en los métodos.
 */
export class DeliveryDriversController extends BaseController {
  public constructor(
    private readonly service: DeliveryDriversService = new DeliveryDriversService()
  ) {
    super();
  }

  // ================== READ ==================
  public async getAll(_req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const deliveryDrivers = await this.service.getAll();
      res.status(200).json({ deliveryDrivers });
    });
  }

  public async getOne(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const deliveryDriver = await this.service.getOne(this.paramId(req));
      res.status(200).json({ deliveryDriver });
    });
  }

  // ================== CREATE ==================
  public async create(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const deliveryDriver = await this.service.create(req.body as CreateDeliveryDriverDto);
      res.status(201).json({ deliveryDriver });
    });
  }

  // ================== UPDATE ==================
  public async updatePut(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const deliveryDriver = await this.service.updatePut(
        this.paramId(req),
        req.body as UpdateDeliveryDriverDto
      );
      res.status(200).json({ deliveryDriver });
    });
  }

  public async updatePatch(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const deliveryDriver = await this.service.updatePatch(
        this.paramId(req),
        req.body as PatchDeliveryDriverDto
      );
      res.status(200).json({ deliveryDriver });
    });
  }

  // ================== DELETE ==================
  /** Eliminación física. */
  public async deletePhysical(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);
      await this.service.deletePhysical(id);
      res.status(200).json({ message: "DeliveryDriver permanently deleted", id });
    });
  }

  /** Eliminación lógica -> `status = inactive`. */
  public async deleteLogical(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const deliveryDriver = await this.service.deleteLogical(this.paramId(req));
      res.status(200).json({ message: "DeliveryDriver deactivated (logical delete)", deliveryDriver });
    });
  }
}
