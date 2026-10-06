import { Request, Response } from "express";
import { BaseController } from "../../../shared/http/base-controller";
import { CreateReservationDto, PatchReservationDto, UpdateReservationDto } from "./dto";
import { ReservationsService } from "./reservations.service";

/**
 * Capa Controller del feature Reservations.
 *
 * Traduce HTTP <-> negocio: lee `req`, llama al service y arma la respuesta.
 * No contiene reglas de negocio ni consultas a Sequelize.
 *
 * Cada método delega el manejo de errores en `run()` (ver `BaseController`):
 * así el `try/catch` no se repite en los métodos.
 */
export class ReservationsController extends BaseController {
  public constructor(
    private readonly service: ReservationsService = new ReservationsService()
  ) {
    super();
  }

  // ================== READ ==================
  public async getAll(_req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const reservations = await this.service.getAll();
      res.status(200).json({ reservations });
    });
  }

  public async getOne(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const reservation = await this.service.getOne(this.paramId(req));
      res.status(200).json({ reservation });
    });
  }

  // ================== CREATE ==================
  public async create(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const reservation = await this.service.create(req.body as CreateReservationDto);
      res.status(201).json({ reservation });
    });
  }

  // ================== UPDATE ==================
  public async updatePut(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const reservation = await this.service.updatePut(
        this.paramId(req),
        req.body as UpdateReservationDto
      );
      res.status(200).json({ reservation });
    });
  }

  public async updatePatch(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const reservation = await this.service.updatePatch(
        this.paramId(req),
        req.body as PatchReservationDto
      );
      res.status(200).json({ reservation });
    });
  }

  // ================== DELETE ==================
  /** Eliminación física. */
  public async deletePhysical(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);
      await this.service.deletePhysical(id);
      res.status(200).json({ message: "Reservation permanently deleted", id });
    });
  }

  /** Eliminación lógica -> `status = inactive`. */
  public async deleteLogical(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const reservation = await this.service.deleteLogical(this.paramId(req));
      res.status(200).json({ message: "Reservation deactivated (logical delete)", reservation });
    });
  }
}
