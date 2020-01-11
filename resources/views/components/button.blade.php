<el-button
    type="{{ $this->type }}"
    size="{{ $this->size }}"
    icon="{{ $this->icon }}"
    :plain="{{ $this->plain ? 'true' : 'false' }}"
    :round="{{ $this->round ? 'true':'false' }}"
    :circle="{{ $this->circle ? 'true':'false' }}"
    :disabled="{{ $this->disabled ? 'true':'false' }}"
    :loading="{{ $this->loading ? 'true':'false' }}"
    :autoFocus="{{ $this->autoFocus ? 'true':'false' }}"
    wire:click="handleClick"
>
    {{ $this->text }}
</el-button>
