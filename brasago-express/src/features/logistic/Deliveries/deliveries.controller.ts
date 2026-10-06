import { Request, Response } from "express";
import { BaseController } from "../../../shared/http/base-controller";
import { CreateDeliveryDto, PatchDeliveryDto, UpdateDeliveryDto } from "./dto";
import { DeliveriesService } from "./deliveries.service";

/**
 * Capa Controller del feature Deliveries.
 *
 * Traduce HTTP <-> negocio: lee `req`, llama al service y arma la respuesta.
 * No contiene reglas de negocio ni consultas a Sequelize.
 *
 * Cada método delega el manejo de errores en `run()` (ver `BaseController`):
 * así el `try/catch` no se repite en los métodos.
 */
export class DeliveriesController extends BaseController {
  public constructor(
    private readonly service: DeliveriesService = new DeliveriesService()
  ) {
    super();
  }

  // ================== READ ==================
  public async getAll(_req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const deliveries = await this.service.getAll();
      res.status(200).json({ deliveries });
    });
  }

  public async getOne(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const delivery = await this.service.getOne(this.paramId(req));
      res.status(200).json({ delivery });
    });
  }

  // ================== CREATE ==================
  public async create(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const delivery = await this.service.create(req.body as CreateDeliveryDto);
      res.status(201).json({ delivery });
    });
  }

  // ================== UPDATE ==================
  public async updatePut(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const delivery = await this.service.updatePut(
        this.paramId(req),
        req.body as UpdateDeliveryDto
      );
      res.status(200).json({ delivery });
    });
  }

  public async updatePatch(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const delivery = await this.service.updatePatch(
        this.paramId(req),
        req.body as PatchDeliveryDto
      );
      res.status(200).json({ delivery });
    });
  }

  // ================== DELETE ==================
  /** Eliminación física. */
  public async deletePhysical(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);
      await this.service.deletePhysical(id);
      res.status(200).json({ message: "Delivery permanently deleted", id });
    });
  }

  /** Eliminación lógica -> `status = inactive`. */
  public async deleteLogical(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const delivery = await this.service.deleteLogical(this.paramId(req));
      res.status(200).json({ message: "Delivery deactivated (logical delete)", delivery });
    });
  }
}
