<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Record;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class RecordControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testUpload()
    {
        Storage::fake('local');

        $file = UploadedFile::fake()->create('test.csv');

        $response = $this->post('/api/upload', [
            'file' => $file,
        ]);

        $response->assertStatus(200)
            ->assertJson(['message' => 'File uploaded successfully']);

        Storage::disk('local')->assertExists('uploads/' . $file->hashName());

        $this->assertDatabaseHas('records', [
            'name' => 'test.csv',
            'url' => Storage::url('uploads/' . $file->hashName())
        ]);
    }

    public function testIndex()
    {
        Record::factory()->count(3)->create();

        $response = $this->get('/api/records');

        $response->assertStatus(200)
            ->assertJsonCount(3);
    }

    public function testStore()
    {
        $response = $this->post('/api/records', [
            'name' => 'Test File',
            'url' => 'http://example.com/test-file.csv',
        ]);

        $response->assertStatus(201)
            ->assertJson([
                'name' => 'Test File',
                'url' => 'http://example.com/test-file.csv'
            ]);

        $this->assertDatabaseHas('records', [
            'name' => 'Test File',
            'url' => 'http://example.com/test-file.csv'
        ]);
    }

    public function testShow()
    {
        $record = Record::factory()->create();

        $response = $this->get('/api/records/' . $record->id);

        $response->assertStatus(200)
            ->assertJson([
                'id' => $record->id,
                'name' => $record->name,
                'url' => $record->url
            ]);
    }

    public function testUpdate()
    {
        $record = Record::factory()->create();

        $response = $this->put('/api/records/' . $record->id, [
            'name' => 'Updated File',
            'url' => 'http://example.com/updated-file.csv',
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'id' => $record->id,
                'name' => 'Updated File',
                'url' => 'http://example.com/updated-file.csv'
            ]);

        $this->assertDatabaseHas('records', [
            'id' => $record->id,
            'name' => 'Updated File',
            'url' => 'http://example.com/updated-file.csv'
        ]);
    }

    public function testDestroy()
    {
        $record = Record::factory()->create();

        $response = $this->delete('/api/records/' . $record->id);

        $response->assertStatus(200)
            ->assertJson(['message' => 'Record deleted successfully']);

        $this->assertDatabaseMissing('records', [
            'id' => $record->id
        ]);
    }
}
