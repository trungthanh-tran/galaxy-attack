<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class HighScore extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {

        return [
            'id' => $this->id,
            'score' => $this->score,
            'level' => $this->level,
            'kills' => $this->kills,
            'time' => $this->time,
            'created_at' => $this->created_at,
        ];
    }
}
