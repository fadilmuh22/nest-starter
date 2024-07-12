import { Inject, Injectable } from '@nestjs/common';
import { CreateSoundDto } from './dto/create-sound.dto';
import { UpdateSoundDto } from './dto/update-sound.dto';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { PG_CONNECTION } from 'src/constants';
import * as schema from '../drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class SoundsService {
  constructor(
    @Inject(PG_CONNECTION) private conn: NodePgDatabase<typeof schema>,
  ) {}

  async create(createSoundDto: CreateSoundDto) {
    return await this.conn
      .insert(schema.sounds)
      .values(createSoundDto)
      .execute();
  }

  async findAll() {
    return await this.conn.query.sounds.findMany();
  }

  async findOne(id: number) {
    return await this.conn.query.sounds.findFirst({
      where: (sound) => eq(sound.sound_id, id),
    });
  }

  update(id: number, updateSoundDto: UpdateSoundDto) {
    return `This action updates a #${id} sound ${updateSoundDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} sound`;
  }
}
