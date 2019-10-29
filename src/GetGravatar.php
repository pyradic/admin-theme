<?php

namespace Pyro\AdminTheme;

use Anomaly\Streams\Platform\Image\Image;

class GetGravatar
{
    /** @var string */
    protected $email;

    protected $parameters = [];

    public function __construct(string $email, array $parameters = [])
    {
        $this->email      = $email;
        $this->parameters = $parameters;
    }

    public function handle(Image $image)
    {
        return $image->make(
            'https://www.gravatar.com/avatar/' . md5($this->email) . '?' . http_build_query(
                $this->parameters
            ),
            'image'
        );
    }


}
